// @flow

import { TagService } from '@fingermenu/parse-server-common';
import { GraphQLBoolean, GraphQLID, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import { NodeInterface } from '../interface';
import StringWithLanguage from './StringWithLanguage';
import Common from './Common';

export const getTag = async (tagId, sessionToken) => new TagService().read(tagId, null, sessionToken);

const ParentTag = new GraphQLObjectType({
  name: 'ParentTag',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: _ => _.get('id'),
    },
    key: {
      type: GraphQLString,
      resolve: async _ => _.get('key'),
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
    imageUrl: {
      type: GraphQLString,
      resolve: async _ => _.get('imageUrl'),
    },
    level: {
      type: GraphQLInt,
      resolve: async _ => _.get('level'),
    },
    forDisplay: {
      type: GraphQLBoolean,
      resolve: async _ => _.get('forDisplay'),
    },
  },
  interfaces: [NodeInterface],
});

export default new GraphQLObjectType({
  name: 'Tag',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: _ => _.get('id'),
    },
    key: {
      type: GraphQLString,
      resolve: async _ => _.get('key'),
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
    imageUrl: {
      type: GraphQLString,
      resolve: async _ => _.get('imageUrl'),
    },
    level: {
      type: GraphQLInt,
      resolve: async _ => _.get('level'),
    },
    forDisplay: {
      type: GraphQLBoolean,
      resolve: async _ => _.get('forDisplay'),
    },
    parentTag: {
      type: ParentTag,
      resolve: async (_, args, { dataLoaders: { tagLoaderById } }) => (_.get('parentTagId') ? tagLoaderById.load(_.get('parentTagId')) : null),
    },
  },
  interfaces: [NodeInterface],
});
