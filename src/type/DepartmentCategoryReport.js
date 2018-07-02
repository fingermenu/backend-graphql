// @flow

import { OrderService, DepartmentCategoryService } from '@fingermenu/parse-server-common';
import { List } from 'immutable';
import { GraphQLInt, GraphQLList, GraphQLFloat, GraphQLObjectType, GraphQLNonNull } from 'graphql';
import { convert, ZonedDateTime } from 'js-joda';
import DepartmentCategory from './DepartmentCategory';

const getAllPaidOrders = async (searchArgs, sessionToken) => {
  const dateTimeRange = {
    from: convert(ZonedDateTime.parse(searchArgs.getIn(['dateTimeRange', 'from']))).toDate(),
    to: convert(ZonedDateTime.parse(searchArgs.getIn(['dateTimeRange', 'to']))).toDate(),
  };

  if (dateTimeRange.to < dateTimeRange.from) {
    throw new Error('dateTimeRange is invalid. \'to\' is less than \'from\'.');
  }

  const criteriaToFetchOrders = Map({
    conditions: Map({
      deosNotExist_cancelledAt: true,
      restaurantId: searchArgs.has('restaurantId') ? searchArgs.get('restaurantId') : undefined,
      greaterThanOrEqualTo_placedAt: dateTimeRange ? dateTimeRange.from : undefined,
      lessThanOrEqualTo_placedAt: dateTimeRange ? dateTimeRange.to : undefined,
    }),
  });
  const result = new OrderService().searchAll(criteriaToFetchOrders, sessionToken);
  let orders = List();

  try {
    result.event.subscribe(info => {
      orders = orders.push(info);
    });

    await result.promise;
  } finally {
    result.event.unsubscribeAll();
  }

  return orders.flatMap(order => order.get('details').filter(orderMenuItemPrice => orderMenuItemPrice.get('paid')));
};

const extractRequiredInfoFromOrderMenuItemPrices = async (
  orderMenuItemPrices,
  { menuItemPriceLoaderById, choiceItemPriceLoaderById },
  sessionToken,
) => {
  const menuItemPriceIds = orderMenuItemPrices.map(orderMenuItemPrice => orderMenuItemPrice.get('menuItemPriceId')).toSet();
  const choiceItemPriceIds = orderMenuItemPrices.flatMap(orderMenuItemPrice => orderMenuItemPrice.get('choiceItemPriceIds')).toSet();
  const menuItemPricesAndChoiceItemPrices = await Promise.all([
    menuItemPriceLoaderById.loadAll(menuItemPriceIds.toArray()),
    choiceItemPriceLoaderById.loadAll(choiceItemPriceIds.toArray()),
    new DepartmentCategoryService().search(Map(), sessionToken),
  ]);

  return {
    menuItemPrices: menuItemPricesAndChoiceItemPrices[0],
    choiceItemPrices: menuItemPricesAndChoiceItemPrices[1],
    departmentCategories: menuItemPricesAndChoiceItemPrices[2],
  };
};

const addPriceInfoToOrderMenuItemPrice = (orderMenuItemPrices, menuItemPrices, choiceItemPrices) =>
  orderMenuItemPrices.map(orderMenuItemPrice =>
    orderMenuItemPrice
      .set(
        'menuItemPrice',
        menuItemPrices.find(menuItemPrice => menuItemPrice.get('id').localeCompare(orderMenuItemPrice.get('menuItemPriceId')) === 0),
      )
      .update('orderChoiceItemPrices', orderChoiceItemPrices =>
        orderChoiceItemPrices.map(orderChoiceItemPrice =>
          orderChoiceItemPrice.set(
            'choiceItemPrice',
            choiceItemPrices.find(choiceItemPrice => choiceItemPrice.get('id').localeCompare(orderChoiceItemPrice.get('choiceItemPriceId')) === 0),
          ),
        ),
      ),
  );

const addDepartmentCategoriesInfoToOrderMenuItemPrice = (orderMenuItemPricesWithPricesInfo, levelTwoDepartmentCategories) =>
  orderMenuItemPricesWithPricesInfo
    .map(orderMenuItemPrice =>
      orderMenuItemPrice.set(
        'departmentCategoryIds',
        levelTwoDepartmentCategories
          .filter(departmentCategory =>
            orderMenuItemPrice.getIn(['menuItemPrice', 'tagIds']).find(tagId => tagId.localeCompare(departmentCategory.getIn(['tag', 'id'])) === 0),
          )
          .map(departmentCategory => departmentCategory.get('id')),
      ),
    )
    .map(orderMenuItemPrice =>
      orderMenuItemPrice.set(
        'departmentCategoryId',
        orderMenuItemPrice.get('departmentCategoryIds').isEmpty() ? null : orderMenuItemPrice.get('departmentCategoryIds').first(),
      ),
    );

const addTagInfoToDepartmentCategories = async (departmentCategories, { tagLoaderById }) => {
  const departmentCategoryTags = await tagLoaderById.loadAll(
    departmentCategories.map(departmentCategory => departmentCategory.get('tagId')).toArray(),
  );

  return departmentCategories.map(departmentCategory =>
    departmentCategory.set('tag', departmentCategoryTags.find(tag => tag.get('id').localeCompare(departmentCategory.get('tagId')) === 0)),
  );
};

export const getDepartmentCategoriesReport = async (
  searchArgs,
  { tagLoaderById, menuItemPriceLoaderById, choiceItemPriceLoaderById },
  sessionToken,
) => {
  const orderMenuItemPrices = await getAllPaidOrders(searchArgs, sessionToken);
  const { menuItemPrices, choiceItemPrices, departmentCategories } = await extractRequiredInfoFromOrderMenuItemPrices(
    menuItemPrices,
    { menuItemPriceLoaderById, choiceItemPriceLoaderById },
    sessionToken,
  );
  const departmentCategoriesWitTagInfo = await addTagInfoToDepartmentCategories(departmentCategories, { tagLoaderById });
  const levelTwoDepartmentCategories = departmentCategoriesWitTagInfo.filter(departmentCategory => departmentCategory.getIn(['tag', 'level']) === 2);
  const orderMenuItemPricesWithPricesInfo = addPriceInfoToOrderMenuItemPrice(orderMenuItemPrices, menuItemPrices, choiceItemPrices);
  const orderMenuItemPricesWithDepartmentCategoryInfo = addDepartmentCategoriesInfoToOrderMenuItemPrice(
    orderMenuItemPricesWithPricesInfo,
    levelTwoDepartmentCategories,
  );
  const orderMenuItemPricesGroupedByDepartmentCategory = orderMenuItemPricesWithDepartmentCategoryInfo.groupBy(orderMenuItemPrice =>
    orderMenuItemPrice.get('departmentCategoryId'),
  );
  const levelTwoReport = orderMenuItemPricesGroupedByDepartmentCategory.map(orderMenuItemPrices =>
    orderMenuItemPrices.reduce(
      (reduction, orderMenuItemPrice) =>
        reduction.update('totalSale', totalSale => {
          var menuItemPriceTotalSale = totalSale;
          const menuItemPriceCurrentPrice = orderMenuItemPrice.getIn(['menuItemPrice', 'currentPrice']);

          if (menuItemPriceCurrentPrice) {
            menuItemPriceTotalSale += orderMenuItemPrice.get('quantity') * menuItemPriceCurrentPrice;
          }

          menuItemPriceTotalSale += orderMenuItemPrice.get('orderChoiceItemPrices').reduce((total, orderChoiceItemPrice) => {
            var choiceItemPriceTotalSale = total;
            const choiceItemPriceCurrentPrice = orderChoiceItemPrice.getIn(['choiceItemPrice', 'currentPrice']);

            if (choiceItemPriceCurrentPrice) {
              choiceItemPriceTotalSale += orderChoiceItemPrice.get('quantity') * choiceItemPriceCurrentPrice;
            }

            return choiceItemPriceTotalSale;
          }, 0.0);

          return menuItemPriceTotalSale;
        }),
      Map({ quantity: orderMenuItemPrices.count(), totalSale: 0.0 }),
    ),
  );

  return List();
};

const DepartmentSubCategoryReport = new GraphQLObjectType({
  name: 'DepartmentSubCategoryReport',
  fields: {
    departmentCategory: {
      type: GraphQLNonNull(DepartmentCategory),
      resolve: async (_, args, { dataLoaders: { departmentCategoryLoaderById } }) => departmentCategoryLoaderById.load(_.get('departmentCategoryId')),
    },
    totalSale: {
      type: new GraphQLNonNull(GraphQLFloat),
      resolve: _ => _.get('totalSale'),
    },
    quantity: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: _ => _.get('quantity'),
    },
  },
});

export default new GraphQLObjectType({
  name: 'DepartmentCategoryReport',
  fields: {
    departmentCategory: {
      type: GraphQLNonNull(DepartmentCategory),
      resolve: async (_, args, { dataLoaders: { departmentCategoryLoaderById } }) => departmentCategoryLoaderById.load(_.get('departmentCategoryId')),
    },
    totalSale: {
      type: new GraphQLNonNull(GraphQLFloat),
      resolve: _ => _.get('totalSale'),
    },
    quantity: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: _ => _.get('quantity'),
    },
    departmentSubCategoriesReport: {
      type: new GraphQLList(new GraphQLNonNull(DepartmentSubCategoryReport)),
      resolve: _ => _.get('departmentSubCategoriesReport'),
    },
  },
});
