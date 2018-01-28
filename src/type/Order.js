// @flow

import { GraphQLID, GraphQLFloat, GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import { OrderService } from '@fingermenu/parse-server-common';
import { NodeInterface } from '../interface';
import OrderState from './OrderState';
import Table, { getTable } from './Table';

export const getOrder = async (orderId, sessionToken) => new OrderService().read(orderId, null, sessionToken);

export default new GraphQLObjectType({
  name: 'Order',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: _ => _.get('id'),
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
      resolve: async _ => _.get('totalPrice'),
    },
    placedAt: {
      type: GraphQLString,
      resolve: async _ => _.get('placedAt'),
    },
    table: {
      type: Table,
      resolve: async (_, args, { sessionToken }) => (_.get('tableId') ? getTable(_.get('tableId'), sessionToken) : null),
    },
    orderState: {
      type: OrderState,
      resolve: async (_, args, { dataLoaders }) => (_.get('orderStateId') ? dataLoaders.orderStateLoaderById.load(_.get('orderStateId')) : null),
    },
  },
  interfaces: [NodeInterface],
});
