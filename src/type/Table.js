// @flow

import { GraphQLID, GraphQLInt, GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
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

        return allValues ? allValues.get(language) : null;
      },
    },
    status: {
      type: GraphQLString,
      resolve: _ => _.get('status'),
    },
    numberOfAdults: {
      type: GraphQLInt,
      resolve: _ => _.get('numberOfAdults'),
    },
    numberOfChildren: {
      type: GraphQLInt,
      resolve: _ => _.get('numberOfChildren'),
    },
    customerName: {
      type: GraphQLString,
      resolve: _ => _.get('customerName'),
    },
    notes: {
      type: GraphQLString,
      resolve: _ => _.get('notes'),
    },
    tableState: {
      type: TableState,
      resolve: async (_, args, { dataLoaders }) => (_.get('tableStateId') ? dataLoaders.tableStateLoaderById.load(_.get('tableStateId')) : null),
    },
  },
  interfaces: [NodeInterface],
});
