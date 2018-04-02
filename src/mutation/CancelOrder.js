// @flow

import { List, Map } from 'immutable';
import { GraphQLID, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { OrderConnection, getOrders } from '../type';
import { cancelOrder } from './OrderHelper';

export default mutationWithClientMutationId({
  name: 'CancelOrder',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  outputFields: {
    order: {
      type: OrderConnection.edgeType,
      resolve: _ => _.get('order'),
    },
  },
  mutateAndGetPayload: async ({ id }, { sessionToken }) => {
    await cancelOrder(id, sessionToken);

    return Map({
      order: (await getOrders(Map({ orderIds: List.of(id) }), sessionToken)).edges[0],
    });
  },
});
