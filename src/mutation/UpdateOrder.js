// @flow

import { List, Map } from 'immutable';
import { GraphQLID, GraphQLInt, GraphQLFloat, GraphQLList, GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { OrderConnection, getOrders } from '../type';
import { updateOrder } from './OrderHelper';
import OrderMenuItemPrice from './OrderMenuItemPrice';

export default mutationWithClientMutationId({
  name: 'UpdateOrder',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    restaurantId: { type: new GraphQLNonNull(GraphQLID) },
    numberOfAdults: { type: GraphQLInt },
    numberOfChildren: { type: GraphQLInt },
    customerName: { type: GraphQLString },
    notes: { type: GraphQLString },
    totalPrice: { type: GraphQLFloat },
    tableId: { type: GraphQLID },
    details: { type: new GraphQLList(new GraphQLNonNull(OrderMenuItemPrice)) },
    printingGroupId: { type: GraphQLID },
  },
  outputFields: {
    order: {
      type: OrderConnection.edgeType,
      resolve: _ => _.get('order'),
    },
  },
  mutateAndGetPayload: async (args, { sessionToken }) => {
    await updateOrder(args, sessionToken);

    return Map({
      order: (await getOrders(Map({ orderIds: List.of(args.id) }), sessionToken)).edges[0],
    });
  },
});
