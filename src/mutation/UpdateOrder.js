// @flow

import { Map } from 'immutable';
import { GraphQLID, GraphQLFloat, GraphQLList, GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { Order } from '../type';
import { updateOrder } from './OrderHelper';
import OrderMenuItemPrice from './OrderMenuItemPrice';

export default mutationWithClientMutationId({
  name: 'UpdateOrder',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
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
      return Map({
        order: await updateOrder(args, dataLoaders, sessionToken),
      });
    } catch (ex) {
      return Map({ errorMessage: ex instanceof Error ? ex.message : ex });
    }
  },
});
