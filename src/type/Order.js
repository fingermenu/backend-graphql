// @flow

import { OrderService } from '@fingermenu/parse-server-common';
import { GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import { NodeInterface } from '../interface';
import Restaurant from './Restaurant';
import Table from './Table';
import Customer from './Customer';
import OrderMenuItemPrice from './OrderMenuItemPrice';

export const getOrder = async (orderId, sessionToken) => new OrderService().read(orderId, null, sessionToken);

export default new GraphQLObjectType({
  name: 'Order',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: _ => _.get('id'),
    },
    correlationId: {
      type: GraphQLID,
      resolve: _ => _.get('correlationId'),
    },
    notes: {
      type: GraphQLString,
      resolve: _ => _.get('notes'),
    },
    placedAt: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: _ => _.get('placedAt').toISOString(),
    },
    cancelledAt: {
      type: GraphQLString,
      resolve: _ => (_.get('cancelledAt') ? _.get('cancelledAt').toISOString() : null),
    },
    restaurant: {
      type: new GraphQLNonNull(Restaurant),
      resolve: async (_, args, { dataLoaders: { restaurantLoaderById } }) => restaurantLoaderById.load(_.get('restaurantId')),
    },
    table: {
      type: Table,
      resolve: async (_, args, { dataLoaders: { tableLoaderById } }) => (_.get('tableId') ? tableLoaderById.load(_.get('tableId')) : null),
    },
    details: {
      type: new GraphQLList(new GraphQLNonNull(OrderMenuItemPrice)),
      resolve: _ => _.get('details').toArray(),
    },
    customers: {
      type: new GraphQLList(new GraphQLNonNull(Customer)),
      resolve: _ => _.get('customers').toArray(),
    },
  },
  interfaces: [NodeInterface],
});
