// @flow

import { TableStateService } from '@fingermenu/parse-server-common';
import { GraphQLID, GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import { NodeInterface } from '../interface';

export const getTableState = async (tableStateId, sessionToken) => new TableStateService().read(tableStateId, null, sessionToken);

export default new GraphQLObjectType({
  name: 'TableState',
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
