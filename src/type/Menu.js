// @flow

import { GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import { MenuService } from '@fingermenu/parse-server-common';
import { NodeInterface } from '../interface';
import MenuItemPrice from './MenuItemPrice';
import Tag from './Tag';

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
      resolve: (_, args, { language }) => {
        const allValues = _.get('name');

        return allValues ? allValues.get(language) : null;
      },
    },
    description: {
      type: GraphQLString,
      resolve: (_, args, { language }) => {
        const allValues = _.get('description');

        return allValues ? allValues.get(language) : null;
      },
    },
    menuPageUrl: {
      type: GraphQLString,
      resolve: async _ => _.get('menuPageUrl'),
    },
    imageUrl: {
      type: GraphQLString,
      resolve: async _ => _.get('imageUrl'),
    },
    menuItemPrices: {
      type: new GraphQLList(new GraphQLNonNull(MenuItemPrice)),
      resolve: async (_, args, { dataLoaders }) =>
        (_.get('menuItemPriceIds') && !_.get('menuItemPriceIds').isEmpty()
          ? (await dataLoaders.menuItemPriceLoaderById.loadMany(_.get('menuItemPriceIds').toArray())).filter(menuItemPrice => !menuItemPrice.has('removedByUser') || !menuItemPrice.get('removedByUser'))
          : []),
    },
    tags: {
      type: new GraphQLList(new GraphQLNonNull(Tag)),
      resolve: async (_, args, { dataLoaders }) =>
        (_.get('tagIds') && !_.get('tagIds').isEmpty() ? dataLoaders.tagLoaderById.loadMany(_.get('tagIds').toArray()) : []),
    },
  },
  interfaces: [NodeInterface],
});
