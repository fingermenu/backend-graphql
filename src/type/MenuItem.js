// @flow

import { MenuItemService } from '@fingermenu/parse-server-common';
import { GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import { NodeInterface } from '../interface';
import Tag from './Tag';
import StringWithLanguage from './StringWithLanguage';
import LinkedPrinter from './LinkedPrinter';
import Common from './Common';

export const getMenuItem = async (menuItemId, sessionToken) => new MenuItemService().read(menuItemId, null, sessionToken);

export default new GraphQLObjectType({
  name: 'MenuItem',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: _ => _.get('id'),
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
    description: {
      type: GraphQLString,
      resolve: async (_, args, { language, dataLoaders, fingerMenuContext }) =>
        Common.getTranslationToDisplay(_, 'description', language, dataLoaders, fingerMenuContext),
    },
    descriptionWithLanguages: {
      type: new GraphQLList(new GraphQLNonNull(StringWithLanguage)),
      resolve: _ => Common.mapMultilanguagesStringToStringWithLanguageCollection(_, 'description'),
    },
    descriptionToPrintOnKitchenReceipt: {
      type: GraphQLString,
      resolve: async (_, args, { dataLoaders, fingerMenuContext }) =>
        Common.getTranslationToPrintOnKitchenReceipt(_, 'description', dataLoaders, fingerMenuContext),
    },
    descriptionToPrintOnCustomerReceipt: {
      type: GraphQLString,
      resolve: async (_, args, { dataLoaders, fingerMenuContext }) =>
        Common.getTranslationToPrintOnCustomerReceipt(_, 'description', dataLoaders, fingerMenuContext),
    },
    menuItemPageUrl: {
      type: GraphQLString,
      resolve: async _ => _.get('menuItemPageUrl'),
    },
    imageUrl: {
      type: GraphQLString,
      resolve: async _ => _.get('imageUrl'),
    },
    tags: {
      type: new GraphQLList(new GraphQLNonNull(Tag)),
      resolve: async (_, args, { dataLoaders: { tagLoaderById } }) => tagLoaderById.loadMany(_.get('tagIds').toArray()),
    },
    linkedPrinters: {
      type: new GraphQLList(new GraphQLNonNull(LinkedPrinter)),
      resolve: _ => (_.get('linkedPrinters') ? _.get('linkedPrinters').toArray() : []),
    },
  },
  interfaces: [NodeInterface],
});
