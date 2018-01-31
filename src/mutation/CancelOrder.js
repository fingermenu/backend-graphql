// @flow

import { Map } from 'immutable';
import { GraphQLID, GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { Order } from '../type';
import { cancelOrder } from './OrderHelper';

export default mutationWithClientMutationId({
  name: 'CancelOrder',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
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
  mutateAndGetPayload: async ({ id }, { dataLoaders, sessionToken }) => {
    try {
      return Map({
        order: await cancelOrder(id, dataLoaders, sessionToken),
      });
    } catch (ex) {
      return Map({ errorMessage: ex instanceof Error ? ex.message : ex });
    }
  },
});
