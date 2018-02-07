// @flow

import { MenuItemPriceService } from '@fingermenu/parse-server-common';
import { GraphQLID, GraphQLList, GraphQLFloat, GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import { NodeInterface } from '../interface';
import ChoiceItemPrice from './ChoiceItemPrice';
import MenuItem from './MenuItem';
import Size from './Size';

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
      resolve: async (_, args, { dataLoaders: { menuItemLoaderById } }) =>
        (_.get('menuItemId') ? menuItemLoaderById.load(_.get('menuItemId')) : null),
    },
    size: {
      type: Size,
      resolve: async (_, args, { dataLoaders: { sizeLoaderById } }) => (_.get('sizeId') ? sizeLoaderById.load(_.get('sizeId')) : null),
    },
    choiceItemPrices: {
      type: new GraphQLList(new GraphQLNonNull(ChoiceItemPrice)),
      resolve: async (_, args, { dataLoaders: { choiceItemPriceLoaderById } }) =>
        (_.get('choiceItemPriceIds') && !_.get('choiceItemPriceIds').isEmpty()
          ? (await choiceItemPriceLoaderById.loadMany(_.get('choiceItemPriceIds').toArray())).filter(choiceItemPrice => !choiceItemPrice.has('removedByUser') || !choiceItemPrice.get('removedByUser'))
          : []),
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
      resolve: async (_, args, { dataLoaders: { menuItemLoaderById } }) =>
        (_.get('menuItemId') ? menuItemLoaderById.load(_.get('menuItemId')) : null),
    },
    size: {
      type: Size,
      resolve: async (_, args, { dataLoaders: { sizeLoaderById } }) => (_.get('sizeId') ? sizeLoaderById.load(_.get('sizeId')) : null),
    },
    toBeServedWithMenuItemPrices: {
      type: new GraphQLList(new GraphQLNonNull(BeServedWithMenuItemPrice)),
      resolve: async (_, args, { dataLoaders: { menuItemPriceLoaderById } }) =>
        (_.get('toBeServedWithMenuItemPriceIds') && !_.get('toBeServedWithMenuItemPriceIds').isEmpty()
          ? (await menuItemPriceLoaderById.loadMany(_.get('toBeServedWithMenuItemPriceIds').toArray())).filter(menuItemPrice => !menuItemPrice.has('removedByUser') || !menuItemPrice.get('removedByUser'))
          : []),
    },
    choiceItemPrices: {
      type: new GraphQLList(new GraphQLNonNull(ChoiceItemPrice)),
      resolve: async (_, args, { dataLoaders: { choiceItemPriceLoaderById } }) =>
        (_.get('choiceItemPriceIds') && !_.get('choiceItemPriceIds').isEmpty()
          ? (await choiceItemPriceLoaderById.loadMany(_.get('choiceItemPriceIds').toArray())).filter(choiceItemPrice => !choiceItemPrice.has('removedByUser') || !choiceItemPrice.get('removedByUser'))
          : []),
    },
  },
  interfaces: [NodeInterface],
});
