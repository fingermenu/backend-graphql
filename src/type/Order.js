// @flow

import { GraphQLID, GraphQLInt, GraphQLList, GraphQLFloat, GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import { OrderService } from '@fingermenu/parse-server-common';
import { NodeInterface } from '../interface';
import Restaurant from './Restaurant';
import Table, { getTable } from './Table';
import OrderMenuItemPrice from './OrderMenuItemPrice';

export const getOrder = async (orderId, sessionToken) => new OrderService().read(orderId, null, sessionToken);

export default new GraphQLObjectType({
  name: 'Order',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: _ => _.get('id'),
    },
    numberOfAdults: {
      type: GraphQLInt,
      resolve: _ => _.get('numberOfAdults'),
    },
    numberOfChildren: {
      type: GraphQLInt,
      resolve: _ => _.get('numberOfChildren'),
    },
    customerName: {
      type: GraphQLString,
      resolve: _ => _.get('customerName'),
    },
    notes: {
      type: GraphQLString,
      resolve: _ => _.get('notes'),
    },
    totalPrice: {
      type: GraphQLFloat,
      resolve: _ => _.get('totalPrice'),
    },
    placedAt: {
      type: GraphQLString,
      resolve: _ => (_.get('placedAt') ? _.get('placedAt').toISOString() : null),
    },
    cancelledAt: {
      type: GraphQLString,
      resolve: _ => (_.get('cancelledAt') ? _.get('cancelledAt').toISOString() : null),
    },
    restaurant: {
      type: Restaurant,
      resolve: async (_, args, { dataLoaders }) => (_.get('restaurantId') ? dataLoaders.restaurantLoaderById.load(_.get('restaurantId')) : null),
    },
    table: {
      type: Table,
      resolve: async (_, args, { sessionToken }) => (_.get('tableId') ? getTable(_.get('tableId'), sessionToken) : null),
    },
    details: {
      type: new GraphQLList(new GraphQLNonNull(OrderMenuItemPrice)),
      resolve: _ => (_.get('details') ? _.get('details').toArray() : null),
    },
  },
  interfaces: [NodeInterface],
});
