// @flow

import { TableStateService } from '@fingermenu/parse-server-common';
import { GraphQLID, GraphQLObjectType, GraphQLList, GraphQLString, GraphQLNonNull } from 'graphql';
import { NodeInterface } from '../interface';
import StringWithLanguage from './StringWithLanguage';
import Common from './Common';

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
    imageUrl: {
      type: GraphQLString,
      resolve: async _ => _.get('imageUrl'),
    },
  },
  interfaces: [NodeInterface],
});
