// @flow

import { MenuItemPriceService } from '@fingermenu/parse-server-common';
import { GraphQLID, GraphQLInt, GraphQLList, GraphQLFloat, GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import { NodeInterface } from '../interface';
import ChoiceItemPrice from './ChoiceItemPrice';
import MenuItem from './MenuItem';
import Tag from './Tag';

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
        _.get('menuItemId') ? menuItemLoaderById.load(_.get('menuItemId')) : null,
    },
    choiceItemPrices: {
      type: new GraphQLList(new GraphQLNonNull(ChoiceItemPrice)),
      resolve: async (_, args, { dataLoaders: { menuItemPriceLoaderById, choiceItemPriceLoaderById } }) => {
        const choiceItemPriceIds = _.get('choiceItemPriceIds');

        if (!choiceItemPriceIds || choiceItemPriceIds.isEmpty()) {
          return [];
        }

        const choiceItemPrices = (await choiceItemPriceLoaderById.loadMany(_.get('choiceItemPriceIds').toArray())).filter(
          choiceItemPrice => !choiceItemPrice.has('removedByUser') || !choiceItemPrice.get('removedByUser'),
        );

        if (choiceItemPrices.length === 0) {
          return [];
        }

        const choiceItemPriceSortOrderIndices = (await menuItemPriceLoaderById.load(_.get('id'))).get('choiceItemPriceSortOrderIndices');

        return choiceItemPrices.map(_ => _.set('sortOrderIndex', choiceItemPriceSortOrderIndices.get(_.get('id'))));
      },
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
        _.get('menuItemId') ? menuItemLoaderById.load(_.get('menuItemId')) : null,
    },
    sortOrderIndex: {
      type: GraphQLInt,
      resolve: _ => _.get('sortOrderIndex'),
    },
    toBeServedWithMenuItemPrices: {
      type: new GraphQLList(new GraphQLNonNull(BeServedWithMenuItemPrice)),
      resolve: async (_, args, { dataLoaders: { menuItemPriceLoaderById, toBeServedWithMenuItemPricePriceLoaderById } }) => {
        const toBeServedWithMenuItemPricePriceIds = _.get('toBeServedWithMenuItemPricePriceIds');

        if (!toBeServedWithMenuItemPricePriceIds || toBeServedWithMenuItemPricePriceIds.isEmpty()) {
          return [];
        }

        const toBeServedWithMenuItemPricePrices = (await toBeServedWithMenuItemPricePriceLoaderById.loadMany(
          _.get('toBeServedWithMenuItemPricePriceIds').toArray(),
        )).filter(
          toBeServedWithMenuItemPricePrice =>
            !toBeServedWithMenuItemPricePrice.has('removedByUser') || !toBeServedWithMenuItemPricePrice.get('removedByUser'),
        );

        if (toBeServedWithMenuItemPricePrices.length === 0) {
          return [];
        }

        const toBeServedWithMenuItemPricePriceSortOrderIndices = (await menuItemPriceLoaderById.load(_.get('id'))).get(
          'toBeServedWithMenuItemPricePriceSortOrderIndices',
        );

        return toBeServedWithMenuItemPricePrices.map(_ => _.set('sortOrderIndex', toBeServedWithMenuItemPricePriceSortOrderIndices.get(_.get('id'))));
      },
    },
    choiceItemPrices: {
      type: new GraphQLList(new GraphQLNonNull(ChoiceItemPrice)),
      resolve: async (_, args, { dataLoaders: { menuItemPriceLoaderById, choiceItemPriceLoaderById } }) => {
        const choiceItemPriceIds = _.get('choiceItemPriceIds');

        if (!choiceItemPriceIds || choiceItemPriceIds.isEmpty()) {
          return [];
        }

        const choiceItemPrices = (await choiceItemPriceLoaderById.loadMany(_.get('choiceItemPriceIds').toArray())).filter(
          choiceItemPrice => !choiceItemPrice.has('removedByUser') || !choiceItemPrice.get('removedByUser'),
        );

        if (choiceItemPrices.length === 0) {
          return [];
        }

        const choiceItemPriceSortOrderIndices = (await menuItemPriceLoaderById.load(_.get('id'))).get('choiceItemPriceSortOrderIndices');

        return choiceItemPrices.map(_ => _.set('sortOrderIndex', choiceItemPriceSortOrderIndices.get(_.get('id'))));
      },
    },
    tags: {
      type: new GraphQLList(new GraphQLNonNull(Tag)),
      resolve: async (_, args, { dataLoaders: { tagLoaderById } }) => tagLoaderById.loadMany(_.get('tagIds').toArray()),
    },
  },
  interfaces: [NodeInterface],
});
