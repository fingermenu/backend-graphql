// @flow

import { GraphQLBoolean, GraphQLNonNull, GraphQLID, GraphQLInt, GraphQLList, GraphQLString, GraphQLInputObjectType } from 'graphql';
import OrderChoiceItemPrice from './OrderChoiceItemPrice';

export default new GraphQLInputObjectType({
  name: 'OrderMenuItemPriceInput',
  fields: {
    id: { type: GraphQLID },
    menuItemPriceId: { type: new GraphQLNonNull(GraphQLID) },
    quantity: { type: new GraphQLNonNull(GraphQLInt) },
    notes: { type: GraphQLString },
    paid: { type: GraphQLBoolean },
    orderChoiceItemPrices: { type: new GraphQLList(new GraphQLNonNull(OrderChoiceItemPrice)) },
  },
});
