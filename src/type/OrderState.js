// @flow

import { GraphQLID, GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import { OrderStateService } from '@fingermenu/parse-server-common';
import { NodeInterface } from '../interface';

export const getOrderState = async (orderStateId, sessionToken) => new OrderStateService().read(orderStateId, null, sessionToken);

export default new GraphQLObjectType({
  name: 'OrderState',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: _ => _.get('id'),
    },
    key: {
      type: GraphQLString,
      resolve: _ => _.get('key'),
    },
    name: {
      type: GraphQLString,
      resolve: (_, args, { language }) => {
        const allValues = _.get('name');

        return allValues ? allValues.get(language) : null;
      },
    },
    imageUrl: {
      type: GraphQLString,
      resolve: async _ => _.get('imageUrl'),
    },
  },
  interfaces: [NodeInterface],
});
