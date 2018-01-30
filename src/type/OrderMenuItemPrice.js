// @flow

import { GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import MenuItemPrice from './MenuItemPrice';
import OrderChoiceItemPrice from './OrderChoiceItemPrice';

export default new GraphQLObjectType({
  name: 'OrderMenuItemPrice',
  fields: {
    quantity: {
      type: GraphQLInt,
      resolve: _ => _.get('quantity'),
    },
    menuItemPrice: {
      type: MenuItemPrice,
      resolve: async (_, args, { dataLoaders }) =>
        (_.get('menuItemPriceId') ? dataLoaders.menuItemPriceLoaderById.load(_.get('menuItemPriceId')) : null),
    },
    orderChoiceItemPrices: {
      type: new GraphQLList(new GraphQLNonNull(OrderChoiceItemPrice)),
      resolve: _ => (_.get('orderChoiceItemPrices') ? _.get('orderChoiceItemPrices').toArray() : []),
    },
  },
});
