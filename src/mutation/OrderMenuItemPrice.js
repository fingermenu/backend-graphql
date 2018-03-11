// @flow

import { GraphQLNonNull, GraphQLID, GraphQLInt, GraphQLList, GraphQLString, GraphQLInputObjectType } from 'graphql';
import OrderChoiceItemPrice from './OrderChoiceItemPrice';

export default new GraphQLInputObjectType({
  name: 'OrderMenuItemPriceInput',
  fields: {
    menuItemPriceId: { type: new GraphQLNonNull(GraphQLID) },
    quantity: { type: new GraphQLNonNull(GraphQLInt) },
    notes: { type: GraphQLString },
    orderChoiceItemPrices: { type: new GraphQLList(new GraphQLNonNull(OrderChoiceItemPrice)) },
  },
});
