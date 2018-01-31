// @flow

import { GraphQLNonNull, GraphQLInt, GraphQLList, GraphQLObjectType } from 'graphql';
import MenuItemPrice from './MenuItemPrice';
import OrderChoiceItemPrice from './OrderChoiceItemPrice';

export default new GraphQLObjectType({
  name: 'OrderMenuItemPrice',
  fields: {
    menuItemPrice: {
      type: new GraphQLNonNull(MenuItemPrice),
      resolve: async (_, args, { dataLoaders }) =>
        (_.get('menuItemPriceId') ? dataLoaders.menuItemPriceLoaderById.load(_.get('menuItemPriceId')) : null),
    },
    quantity: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: _ => _.get('quantity'),
    },
    orderChoiceItemPrices: {
      type: new GraphQLList(new GraphQLNonNull(OrderChoiceItemPrice)),
      resolve: _ => (_.get('orderChoiceItemPrices') ? _.get('orderChoiceItemPrices').toArray() : []),
    },
  },
});
