// @flow

import { TableService } from '@fingermenu/parse-server-common';
import { GraphQLID, GraphQLInt, GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import { NodeInterface } from '../interface';
import TableState from './TableState';
import Common from './Common';

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
      resolve: async (_, args, { language, dataLoaders: { configLoader } }) => Common.getTranslation(_, 'name', language, configLoader),
    },
    nameToPrint: {
      type: GraphQLString,
      resolve: async (_, args, { dataLoaders: { configLoader } }) => Common.getTranslationToPrint(_, 'name', configLoader),
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
    sortOrderIndex: {
      type: GraphQLInt,
      resolve: _ => _.get('sortOrderIndex'),
    },
    lastOrderCorrelationId: {
      type: GraphQLID,
      resolve: _ => _.get('lastOrderCorrelationId'),
    },
    tableState: {
      type: TableState,
      resolve: async (_, args, { dataLoaders: { tableStateLoaderById } }) =>
        _.get('tableStateId') ? tableStateLoaderById.load(_.get('tableStateId')) : null,
    },
  },
  interfaces: [NodeInterface],
});
