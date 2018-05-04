// @flow

import { List, Map } from 'immutable';
import { GraphQLID, GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { OrderConnection, getOrders } from '../type';
import { cancelOrder } from './OrderHelper';
import logUserRequest from './RequestLogHelper';

export default mutationWithClientMutationId({
  name: 'CancelOrder',
  inputFields: {
    appVersion: { type: GraphQLString },
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  outputFields: {
    order: {
      type: OrderConnection.edgeType,
      resolve: _ => _.get('order'),
    },
  },
  mutateAndGetPayload: async (args, { dataLoaders, sessionToken }) => {
    logUserRequest(args, 'Mutation - Cancel Order', dataLoaders, sessionToken);

    const id = args.id;

    await cancelOrder(id, sessionToken);

    return Map({
      order: (await getOrders(Map({ orderIds: List.of((id: id)) }), sessionToken)).edges[0],
    });
  },
});
