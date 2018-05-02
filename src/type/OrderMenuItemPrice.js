// @flow

import { GraphQLBoolean, GraphQLID, GraphQLFloat, GraphQLNonNull, GraphQLInt, GraphQLList, GraphQLString, GraphQLObjectType } from 'graphql';
import MenuItemPrice from './MenuItemPrice';
import ServingTime from './ServingTime';
import PaymentGroup from './PaymentGroup';
import Customer from './Customer';
import OrderChoiceItemPrice from './OrderChoiceItemPrice';

export default new GraphQLObjectType({
  name: 'OrderMenuItemPrice',
  fields: {
    id: {
      type: GraphQLID,
      resolve: _ => _.get('id'),
    },
    groupId: {
      type: GraphQLID,
      resolve: _ => _.get('groupId'),
    },
    customer: {
      type: Customer,
      resolve: _ => _.get('customer'),
    },
    paymentGroup: {
      type: PaymentGroup,
      resolve: _ => _.get('paymentGroup'),
    },
    menuItemPrice: {
      type: new GraphQLNonNull(MenuItemPrice),
      resolve: async (_, args, { dataLoaders }) =>
        _.get('menuItemPriceId') ? dataLoaders.menuItemPriceLoaderById.load(_.get('menuItemPriceId')) : null,
    },
    quantity: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: _ => _.get('quantity'),
    },
    notes: {
      type: GraphQLString,
      resolve: _ => _.get('notes'),
    },
    paid: {
      type: GraphQLBoolean,
      resolve: _ => _.get('paid'),
    },
    discount: {
      type: GraphQLFloat,
      resolve: _ => _.get('discount'),
    },
    orderChoiceItemPrices: {
      type: new GraphQLList(new GraphQLNonNull(OrderChoiceItemPrice)),
      resolve: _ => (_.get('orderChoiceItemPrices') ? _.get('orderChoiceItemPrices').toArray() : []),
    },
    servingTime: {
      type: ServingTime,
      resolve: async (_, args, { dataLoaders }) => (_.get('servingTimeId') ? dataLoaders.servingTimeLoaderById.load(_.get('servingTimeId')) : null),
    },
  },
});
