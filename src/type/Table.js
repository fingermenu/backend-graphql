// @flow

import { TableService } from '@fingermenu/parse-server-common';
import { GraphQLID, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import { NodeInterface } from '../interface';
import TableState from './TableState';
import Customer from './Customer';
import StringWithLanguage from './StringWithLanguage';
import Common from './Common';

export const getTable = async (tableId, sessionToken) => new TableService().read(tableId, null, sessionToken);

export default new GraphQLObjectType({
  name: 'Table',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: _ => _.get('id'),
    },
    customers: {
      type: new GraphQLList(new GraphQLNonNull(Customer)),
      resolve: _ => _.get('customers').toArray(),
    },
    name: {
      type: GraphQLString,
      resolve: async (_, args, { language, dataLoaders, fingerMenuContext }) =>
        Common.getTranslationToDisplay(_, 'name', language, dataLoaders, fingerMenuContext),
    },
    nameWithLanguages: {
      type: new GraphQLList(new GraphQLNonNull(StringWithLanguage)),
      resolve: _ => Common.mapMultilanguagesStringToStringWithLanguageCollection(_, 'name'),
    },
    nameToPrintOnKitchenReceipt: {
      type: GraphQLString,
      resolve: async (_, args, { dataLoaders, fingerMenuContext }) =>
        Common.getTranslationToPrintOnKitchenReceipt(_, 'name', dataLoaders, fingerMenuContext),
    },
    nameToPrintOnCustomerReceipt: {
      type: GraphQLString,
      resolve: async (_, args, { dataLoaders, fingerMenuContext }) =>
        Common.getTranslationToPrintOnCustomerReceipt(_, 'name', dataLoaders, fingerMenuContext),
    },
    status: {
      type: GraphQLString,
      resolve: _ => _.get('status'),
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
