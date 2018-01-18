// @flow

import { GraphQLID, GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import { TableService } from '@fingermenu/parse-server-common';
import { NodeInterface } from '../interface';
import TableState from './TableState';

export const getTable = async (tableId, sessionToken) => new TableService().read(tableId, null, sessionToken);

export default new GraphQLObjectType({
  name: 'Table',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: _ => _.get('id'),
    },
    name: {
      type: GraphQLString,
      resolve: (_, args, { language }) => {
        const allValues = _.get('name');

        return allValues ? allValues.get(`${language}_name`) : null;
      },
    },
    status: {
      type: GraphQLString,
      resolve: _ => _.get('status'),
    },
    tableState: {
      type: TableState,
      resolve: async (_, args, { dataLoaders }) => dataLoaders.tableStateLoaderById.load(_.get('tableStateId')),
    },
  },
  interfaces: [NodeInterface],
});
