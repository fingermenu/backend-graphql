// @flow

import { OrderService, DepartmentCategoryService } from '@fingermenu/parse-server-common';
import { List, Map } from 'immutable';
import { GraphQLInt, GraphQLList, GraphQLFloat, GraphQLObjectType, GraphQLNonNull } from 'graphql';
import { convert, ZonedDateTime } from 'js-joda';
import cuid from 'cuid';
import DepartmentCategory from './DepartmentCategory';
import { otherTagId } from '../loaders';

const otherDepartmentCategoryId = cuid();
const otherSubDepartmentCategoryId = cuid();

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
    menuItemPriceLoaderById.loadMany(menuItemPriceIds.toArray()),
    choiceItemPriceLoaderById.loadMany(choiceItemPriceIds.toArray()),
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
  const departmentCategoryTags = await tagLoaderById.loadMany(
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
  const ordersGroupedByPaymentGroup = orderMenuItemPrices.groupBy(_ => _.getIn(['paymentGroup', 'paymentGroupId']));
  const eftposAndCashTotal = ordersGroupedByPaymentGroup.reduce(
    (reduction, orders) =>
      reduction
        .update('eftpos', eftpos => eftpos + orders.first().getIn(['paymentGroup', 'eftpos']))
        .update('cash', cash => cash + orders.first().getIn(['paymentGroup', 'cash'])),
    Map({ eftpos: 0.0, cash: 0.0 }),
  );

  const { menuItemPrices, choiceItemPrices, departmentCategories } = await extractRequiredInfoFromOrderMenuItemPrices(
    orderMenuItemPrices,
    { menuItemPriceLoaderById, choiceItemPriceLoaderById },
    sessionToken,
  );
  const departmentCategoriesWitTagInfo = await addTagInfoToDepartmentCategories(departmentCategories, { tagLoaderById });
  const levelOneDepartmentCategories = departmentCategoriesWitTagInfo.filter(departmentCategory => departmentCategory.getIn(['tag', 'level']) === 1);
  const levelTwoDepartmentCategories = departmentCategoriesWitTagInfo.filter(departmentCategory => departmentCategory.getIn(['tag', 'level']) === 2);
  const orderMenuItemPricesWithPricesInfo = addPriceInfoToOrderMenuItemPrice(orderMenuItemPrices, menuItemPrices, choiceItemPrices);
  const orderMenuItemPricesWithDepartmentCategoryInfo = addDepartmentCategoriesInfoToOrderMenuItemPrice(
    orderMenuItemPricesWithPricesInfo,
    levelTwoDepartmentCategories,
  );
  const orderMenuItemPricesGroupedByDepartmentCategory = orderMenuItemPricesWithDepartmentCategoryInfo.groupBy(orderMenuItemPrice =>
    orderMenuItemPrice.get('departmentCategoryId'),
  );
  const levelTwoReport = orderMenuItemPricesGroupedByDepartmentCategory
    .mapEntries(([departmentCategoryId, orderMenuItemPrices]) => {
      const parentDepartmentCategoryTagId = departmentCategoryId
        ? levelTwoDepartmentCategories
          .find(departmentCategory => departmentCategory.get('id').localeCompare(departmentCategoryId) === 0)
          .getIn(['tag', 'parentTagId'])
        : null;
      const parentDepartmentCategoryId = parentDepartmentCategoryTagId
        ? levelOneDepartmentCategories
          .find(departmentCategory => departmentCategory.getIn(['tag', 'id']).localeCompare(parentDepartmentCategoryTagId) === 0)
          .get('id')
        : null;
      const report = orderMenuItemPrices.reduce(
        (reduction, orderMenuItemPrice) =>
          reduction.update('totalSale', totalSale => {
            var menuItemPriceTotalSale = totalSale;
            const menuItemPriceCurrentPrice = orderMenuItemPrice.getIn(['menuItemPrice', 'currentPrice']);

            if (menuItemPriceCurrentPrice) {
              menuItemPriceTotalSale += menuItemPriceCurrentPrice;
            }

            menuItemPriceTotalSale += orderMenuItemPrice.get('orderChoiceItemPrices').reduce((total, orderChoiceItemPrice) => {
              const choiceItemPriceCurrentPrice = orderChoiceItemPrice.getIn(['choiceItemPrice', 'currentPrice']);

              return choiceItemPriceCurrentPrice ? total + choiceItemPriceCurrentPrice : total;
            }, 0.0);

            return menuItemPriceTotalSale;
          }),
        Map({ parentDepartmentCategoryId, departmentCategoryId, quantity: orderMenuItemPrices.count(), totalSale: 0.0 }),
      );

      return [departmentCategoryId, report];
    })
    .valueSeq()
    .toList();

  const reportGroupedByParentDepartmentcategoryId = levelTwoReport.groupBy(report => report.get('parentDepartmentCategoryId'));
  const departmentCategoriesReport = reportGroupedByParentDepartmentcategoryId.keySeq().map(parentDepartmentCategoryId => {
    const subReport = reportGroupedByParentDepartmentcategoryId.get(parentDepartmentCategoryId);

    return Map({ departmentCategoryId: parentDepartmentCategoryId })
      .merge(
        subReport.reduce(
          (reduction, report) =>
            reduction
              .update('quantity', quantity => quantity + report.get('quantity'))
              .update('totalSale', totalSale => totalSale + report.get('totalSale')),
          Map({ quantity: 0, totalSale: 0.0 }),
        ),
      )
      .set(
        'departmentSubCategoriesReport',
        subReport.map(report =>
          Map({ departmentCategoryId: report.get('departmentCategoryId'), quantity: report.get('quantity'), totalSale: report.get('totalSale') }),
        ),
      );
  });
  const totalSale = departmentCategoriesReport.reduce((reduction, value) => reduction + value.get('totalSale'), 0);
  const quantity = departmentCategoriesReport.reduce((reduction, value) => reduction + value.get('quantity'), 0);

  return eftposAndCashTotal.merge(Map({ departmentCategoriesReport, totalSale, quantity }));
};

const DepartmentSubCategoryReport = new GraphQLObjectType({
  name: 'DepartmentSubCategoryReport',
  fields: {
    departmentCategory: {
      type: GraphQLNonNull(DepartmentCategory),
      resolve: async (_, args, { dataLoaders: { departmentCategoryLoaderById } }) => {
        const departmentCategoryId = _.get('departmentCategoryId');

        if (departmentCategoryId) {
          return await departmentCategoryLoaderById.load(departmentCategoryId);
        }

        return Map({ id: otherSubDepartmentCategoryId, tagId: otherTagId });
      },
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

const DepartmentCategoryReport = new GraphQLObjectType({
  name: 'DepartmentCategoryReport',
  fields: {
    departmentCategory: {
      type: GraphQLNonNull(DepartmentCategory),
      resolve: async (_, args, { dataLoaders: { departmentCategoryLoaderById } }) => {
        const departmentCategoryId = _.get('departmentCategoryId');

        if (departmentCategoryId) {
          return await departmentCategoryLoaderById.load(departmentCategoryId);
        }

        return Map({ id: otherDepartmentCategoryId, tagId: otherTagId });
      },
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

export default new GraphQLObjectType({
  name: 'DepartmentCategoryRootReport',
  fields: {
    departmentCategoriesReport: {
      type: new GraphQLList(new GraphQLNonNull(DepartmentCategoryReport)),
      resolve: _ => _.get('departmentCategoriesReport').toArray(),
    },
    totalSale: {
      type: new GraphQLNonNull(GraphQLFloat),
      resolve: _ => _.get('totalSale'),
    },
    quantity: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: _ => _.get('quantity'),
    },
    eftpos: {
      type: new GraphQLNonNull(GraphQLFloat),
      resolve: _ => _.get('eftpos'),
    },
    cash: {
      type: new GraphQLNonNull(GraphQLFloat),
      resolve: _ => _.get('cash'),
    },
  },
});
