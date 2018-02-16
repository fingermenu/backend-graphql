// @flow

import { MenuService } from '@fingermenu/parse-server-common';
import { GraphQLID, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import { NodeInterface } from '../interface';
import MenuItemPrice from './MenuItemPrice';
import Tag from './Tag';
import Common from './Common';

export const getMenu = async (menuId, sessionToken) => new MenuService().read(menuId, null, sessionToken);

export default new GraphQLObjectType({
  name: 'Menu',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: _ => _.get('id'),
    },
    name: {
      type: GraphQLString,
      resolve: async (_, args, { language, dataLoaders: { configLoader } }) => Common.getTranslation(_, 'name', language, configLoader),
    },
    description: {
      type: GraphQLString,
      resolve: async (_, args, { language, dataLoaders: { configLoader } }) => Common.getTranslation(_, 'description', language, configLoader),
    },
    menuPageUrl: {
      type: GraphQLString,
      resolve: async _ => _.get('menuPageUrl'),
    },
    imageUrl: {
      type: GraphQLString,
      resolve: async _ => _.get('imageUrl'),
    },
    menuItemSortOrderIndex: {
      type: GraphQLInt,
      resolve: _ => _.get('menuItemSortOrderIndex'),
    },
    menuItemPrices: {
      type: new GraphQLList(new GraphQLNonNull(MenuItemPrice)),
      resolve: async (_, args, { dataLoaders: { menuItemPriceLoaderById } }) =>
        _.get('menuItemPriceIds') && !_.get('menuItemPriceIds').isEmpty()
          ? (await menuItemPriceLoaderById.loadMany(_.get('menuItemPriceIds').toArray())).filter(
            menuItemPrice => !menuItemPrice.has('removedByUser') || !menuItemPrice.get('removedByUser'),
          )
          : [],
    },
    tags: {
      type: new GraphQLList(new GraphQLNonNull(Tag)),
      resolve: async (_, args, { dataLoaders: { tagLoaderById } }) =>
        _.get('tagIds') && !_.get('tagIds').isEmpty() ? tagLoaderById.loadMany(_.get('tagIds').toArray()) : [],
    },
  },
  interfaces: [NodeInterface],
});
