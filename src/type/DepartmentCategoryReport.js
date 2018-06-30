// @flow

import { OrderService } from '@fingermenu/parse-server-common';
import { List } from 'immutable';
import { GraphQLInt, GraphQLList, GraphQLFloat, GraphQLObjectType, GraphQLNonNull } from 'graphql';
import { convert, ZonedDateTime } from 'js-joda';
import DepartmentCategory from './DepartmentCategory';

export const getDepartmentCategoriesReport = async (searchArgs, dataLoaders, sessionToken) => {
  let dateTimeRange;

  if (searchArgs.has('dateTimeRange')) {
    dateTimeRange = {
      from: convert(ZonedDateTime.parse(searchArgs.getIn(['dateTimeRange', 'from']))).toDate(),
      to: convert(ZonedDateTime.parse(searchArgs.getIn(['dateTimeRange', 'to']))).toDate(),
    };

    if (dateTimeRange.to < dateTimeRange.from) {
      throw new Error("dateTimeRange is invalid. 'to' is less than 'from'.");
    }
  }

  const criteria = Map({
    ids: searchArgs.has('orderIds') ? searchArgs.get('orderIds') : undefined,
    conditions: Map({
      correlationId: searchArgs.has('correlationId') ? searchArgs.get('correlationId') : undefined,
      deosNotExist_cancelledAt: true,
      restaurantId: searchArgs.has('restaurantId') ? searchArgs.get('restaurantId') : undefined,
      greaterThanOrEqualTo_placedAt: dateTimeRange ? dateTimeRange.from : undefined,
      lessThanOrEqualTo_placedAt: dateTimeRange ? dateTimeRange.to : undefined,
    }),
  });

  let orders = List();
  const result = new OrderService().searchAll(criteria, sessionToken);

  try {
    result.event.subscribe(info => {
      orders = orders.push(info);
    });

    await result.promise;
  } finally {
    result.event.unsubscribeAll();
  }

  const orderMenuItemPrices = orders
    .flatMap(order => order.get('details').filter(orderMenuItemPrice => orderMenuItemPrice.get('paid')))
    .map(orderMenuItemPrice =>
      Map({
        menuItemPriceId: orderMenuItemPrice.get('menuItemPriceId'),
        paymentGroup: orderMenuItemPrice.get('paymentGroup'),
        orderChoiceItemPrices: orderMenuItemPrice.get('orderChoiceItemPrices'),
      }),
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
