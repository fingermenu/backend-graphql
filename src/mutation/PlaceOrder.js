// @flow

import { List, Map } from 'immutable';
import { GraphQLID, GraphQLInt, GraphQLFloat, GraphQLList, GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { OrderConnection, getOrders } from '../type';
import { addOrder } from './OrderHelper';
import OrderMenuItemPrice from './OrderMenuItemPrice';

export default mutationWithClientMutationId({
  name: 'PlaceOrder',
  inputFields: {
    corelationId: { type: GraphQLID },
    restaurantId: { type: new GraphQLNonNull(GraphQLID) },
    numberOfAdults: { type: GraphQLInt },
    numberOfChildren: { type: GraphQLInt },
    customerName: { type: GraphQLString },
    notes: { type: GraphQLString },
    totalPrice: { type: GraphQLFloat },
    tableId: { type: GraphQLID },
    details: { type: new GraphQLList(new GraphQLNonNull(OrderMenuItemPrice)) },
  },
  outputFields: {
    errorMessage: {
      type: GraphQLString,
      resolve: _ => _.get('errorMessage'),
    },
    order: {
      type: OrderConnection.edgeType,
      resolve: _ => _.get('order'),
    },
  },
  mutateAndGetPayload: async (args, { dataLoaders, sessionToken }) => {
    try {
      const orderId = await addOrder(args, dataLoaders, sessionToken);

      return Map({
        order: (await getOrders(Map({ orderIds: List.of(orderId) }), sessionToken)).edges[0],
      });
    } catch (ex) {
      return Map({ errorMessage: ex instanceof Error ? ex.message : ex });
    }
  },
});
