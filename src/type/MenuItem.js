// @flow

import { MenuItemService } from '@fingermenu/parse-server-common';
import { GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import { NodeInterface } from '../interface';
import Tag from './Tag';
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
      resolve: async (_, args, { language, dataLoaders: { configLoader } }) => Common.getTranslation(_, 'name', language, configLoader),
    },
    nameToPrint: {
      type: GraphQLString,
      resolve: async (_, args, { dataLoaders: { configLoader } }) => Common.getTranslationToPrint(_, 'name', configLoader),
    },
    description: {
      type: GraphQLString,
      resolve: async (_, args, { language, dataLoaders: { configLoader } }) => Common.getTranslation(_, 'description', language, configLoader),
    },
    descriptionToPrint: {
      type: GraphQLString,
      resolve: async (_, args, { dataLoaders: { configLoader } }) => Common.getTranslationToPrint(_, 'description', configLoader),
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
  },
  interfaces: [NodeInterface],
});
