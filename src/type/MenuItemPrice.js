// @flow

import { GraphQLID, GraphQLList, GraphQLFloat, GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import { MenuItemPriceService } from '@fingermenu/parse-server-common';
import { NodeInterface } from '../interface';
import ChoiceItemPrice from './ChoiceItemPrice';
import MenuItem from './MenuItem';

export const getMenuItemPrice = async (menuItemPriceId, sessionToken) => new MenuItemPriceService().read(menuItemPriceId, null, sessionToken);

const BeServedWithMenuItemPrice = new GraphQLObjectType({
  name: 'BeServedWithMenuItemPrice',
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
    choiceItemPrices: {
      type: new GraphQLList(new GraphQLNonNull(ChoiceItemPrice)),
      resolve: async (_, args, { dataLoaders }) => dataLoaders.choiceItemPriceLoaderById.loadMany(_.get('choiceItemPriceIds').toArray()),
    },
  },
  interfaces: [NodeInterface],
});

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
    toBeServedWithMenuItemPrices: {
      type: new GraphQLList(new GraphQLNonNull(BeServedWithMenuItemPrice)),
      resolve: async (_, args, { dataLoaders }) => dataLoaders.menuItemPriceLoaderById.loadMany(_.get('toBeServedWithMenuItemPriceIds').toArray()),
    },
    choiceItemPrices: {
      type: new GraphQLList(new GraphQLNonNull(ChoiceItemPrice)),
      resolve: async (_, args, { dataLoaders }) => dataLoaders.choiceItemPriceLoaderById.loadMany(_.get('choiceItemPriceIds').toArray()),
    },
  },
  interfaces: [NodeInterface],
});
