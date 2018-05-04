// @flow

import { List, Map } from 'immutable';
import { GraphQLID, GraphQLInt, GraphQLList, GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { OrderConnection, getOrders } from '../type';
import { addOrder } from './OrderHelper';
import OrderMenuItemPrice from './OrderMenuItemPrice';
import logUserRequest from './RequestLogHelper';

export default mutationWithClientMutationId({
  name: 'PlaceOrder',
  inputFields: {
    appVersion: { type: GraphQLString },
    correlationId: { type: GraphQLID },
    restaurantId: { type: new GraphQLNonNull(GraphQLID) },
    numberOfAdults: { type: GraphQLInt },
    numberOfChildren: { type: GraphQLInt },
    customerName: { type: GraphQLString },
    notes: { type: GraphQLString },
    tableId: { type: GraphQLID },
    details: { type: new GraphQLList(new GraphQLNonNull(OrderMenuItemPrice)) },
  },
  outputFields: {
    order: {
      type: OrderConnection.edgeType,
      resolve: _ => _.get('order'),
    },
  },
  mutateAndGetPayload: async (args, { dataLoaders, sessionToken }) => {
    logUserRequest(args, 'Mutation - Place Order', dataLoaders, sessionToken);

    const orderId = await addOrder(args, dataLoaders, sessionToken);

    return Map({
      order: (await getOrders(Map({ orderIds: List.of(orderId) }), sessionToken)).edges[0],
    });
  },
});
