// @flow

import { MenuService } from '@fingermenu/parse-server-common';
import { GraphQLID, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import { NodeInterface } from '../interface';
import MenuItemPrice from './MenuItemPrice';
import Tag from './Tag';
import StringWithLanguage from './StringWithLanguage';
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
    menuPageUrl: {
      type: GraphQLString,
      resolve: async _ => _.get('menuPageUrl'),
    },
    imageUrl: {
      type: GraphQLString,
      resolve: async _ => _.get('imageUrl'),
    },
    sortOrderIndex: {
      type: GraphQLInt,
      resolve: _ => _.get('sortOrderIndex'),
    },
    menuItemPrices: {
      type: new GraphQLList(new GraphQLNonNull(MenuItemPrice)),
      resolve: async (_, args, { dataLoaders: { menuLoaderById, menuItemPriceLoaderById } }) => {
        const menuItemPriceIds = _.get('menuItemPriceIds');

        if (!menuItemPriceIds || menuItemPriceIds.isEmpty()) {
          return [];
        }

        const menuItemPrices = (await menuItemPriceLoaderById.loadMany(_.get('menuItemPriceIds').toArray())).filter(
          menuItemPrice => !menuItemPrice.has('removedByUser') || !menuItemPrice.get('removedByUser'),
        );

        if (menuItemPrices.length === 0) {
          return [];
        }

        const menuItemPriceSortOrderIndices = (await menuLoaderById.load(_.get('id'))).get('menuItemPriceSortOrderIndices');

        return menuItemPrices.map(_ => _.set('sortOrderIndex', menuItemPriceSortOrderIndices.get(_.get('id'))));
      },
    },
    tags: {
      type: new GraphQLList(new GraphQLNonNull(Tag)),
      resolve: async (_, args, { dataLoaders: { tagLoaderById } }) =>
        _.get('tagIds') && !_.get('tagIds').isEmpty() ? tagLoaderById.loadMany(_.get('tagIds').toArray()) : [],
    },
  },
  interfaces: [NodeInterface],
});
