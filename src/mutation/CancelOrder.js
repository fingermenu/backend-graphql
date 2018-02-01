// @flow

import { List, Map } from 'immutable';
import { GraphQLID, GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { OrderConnection, getOrders } from '../type';
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
      type: OrderConnection.edgeType,
      resolve: _ => _.get('order'),
    },
  },
  mutateAndGetPayload: async ({ id }, { dataLoaders, sessionToken, language }) => {
    try {
      await cancelOrder(id, dataLoaders, sessionToken);

      return Map({
        order: (await getOrders(Map({ orderIds: List.of(id) }), dataLoaders, sessionToken, language)).edges[0],
      });
    } catch (ex) {
      return Map({ errorMessage: ex instanceof Error ? ex.message : ex });
    }
  },
});
