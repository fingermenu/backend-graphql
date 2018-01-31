// @flow

import { Map } from 'immutable';
import { GraphQLID, GraphQLFloat, GraphQLList, GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { Order, getOrder } from '../type';
import { addOrder } from './OrderHelper';
import OrderMenuItemPrice from './OrderMenuItemPrice';

export default mutationWithClientMutationId({
  name: 'PlaceOrder',
  inputFields: {
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
      type: Order,
      resolve: _ => _.get('order'),
    },
  },
  mutateAndGetPayload: async (args, { dataLoaders, sessionToken }) => {
    try {
      const orderId = await addOrder(args, dataLoaders, sessionToken);

      return Map({
        order: (await getOrder(orderId, sessionToken)).edges[0],
      });
    } catch (ex) {
      return Map({ errorMessage: ex instanceof Error ? ex.message : ex });
    }
  },
});
