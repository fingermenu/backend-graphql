// @flow

import { GraphQLBoolean, GraphQLID, GraphQLNonNull, GraphQLInt, GraphQLList, GraphQLString, GraphQLObjectType } from 'graphql';
import MenuItemPrice from './MenuItemPrice';
import OrderChoiceItemPrice from './OrderChoiceItemPrice';

export default new GraphQLObjectType({
  name: 'OrderMenuItemPrice',
  fields: {
    id: {
      type: GraphQLID,
      resolve: _ => _.get('id'),
    },
    menuItemPrice: {
      type: new GraphQLNonNull(MenuItemPrice),
      resolve: async (_, args, { dataLoaders }) =>
        _.get('menuItemPriceId') ? dataLoaders.menuItemPriceLoaderById.load(_.get('menuItemPriceId')) : null,
    },
    quantity: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: _ => _.get('quantity'),
    },
    notes: {
      type: GraphQLString,
      resolve: _ => _.get('notes'),
    },
    paid: {
      type: GraphQLBoolean,
      resolve: _ => _.get('paid'),
    },
    orderChoiceItemPrices: {
      type: new GraphQLList(new GraphQLNonNull(OrderChoiceItemPrice)),
      resolve: _ => (_.get('orderChoiceItemPrices') ? _.get('orderChoiceItemPrices').toArray() : []),
    },
  },
});
