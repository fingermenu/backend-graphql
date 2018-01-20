// @flow

import { GraphQLID, GraphQLFloat, GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import { MenuItemPriceService } from '@fingermenu/parse-server-common';
import { NodeInterface } from '../interface';
import MenuItem from './MenuItem';

export const getMenuItemPrice = async (menuItemPriceId, sessionToken) => new MenuItemPriceService().read(menuItemPriceId, null, sessionToken);

export default new GraphQLObjectType({
  name: 'MenuItemPrice',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: _ => _.get('id'),
    },
    currentPrice: {
      type: GraphQLFloat,
      resolve: async _ => _.get('currentPrice'),
    },
    wasPrice: {
      type: GraphQLFloat,
      resolve: async _ => _.get('wasPrice'),
    },
    validFrom: {
      type: GraphQLString,
      resolve: async _ => _.get('validFrom'),
    },
    validUntil: {
      type: GraphQLString,
      resolve: async _ => _.get('validUntil'),
    },
    menuItem: {
      type: MenuItem,
      resolve: async (_, args, { dataLoaders }) => dataLoaders.menuItemLoaderById.load(_.get('menuItemId')),
    },
  },
  interfaces: [NodeInterface],
});
