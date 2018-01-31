// @flow

import { GraphQLNonNull, GraphQLID, GraphQLInt, GraphQLList, GraphQLInputObjectType } from 'graphql';
import OrderChoiceItemPrice from './OrderChoiceItemPrice';

export default new GraphQLInputObjectType({
  name: 'OrderMenuItemPriceInput',
  fields: {
    menuItemPriceId: { type: new GraphQLNonNull(GraphQLID) },
    quantity: { type: new GraphQLNonNull(GraphQLInt) },
    orderChoiceItemPrices: { type: new GraphQLList(new GraphQLNonNull(OrderChoiceItemPrice)) },
  },
});
