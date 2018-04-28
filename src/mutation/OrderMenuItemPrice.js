// @flow

import { GraphQLBoolean, GraphQLFloat, GraphQLNonNull, GraphQLID, GraphQLInt, GraphQLList, GraphQLString, GraphQLInputObjectType } from 'graphql';
import OrderChoiceItemPrice from './OrderChoiceItemPrice';

export default new GraphQLInputObjectType({
  name: 'OrderMenuItemPriceInput',
  fields: {
    id: { type: GraphQLID },
    groupId: { type: GraphQLID },
    paymentGroupId: { type: GraphQLID },
    paymentGroupDiscount: { type: GraphQLFloat },
    paymentGroupDateTime: { type: GraphQLString },
    menuItemPriceId: { type: new GraphQLNonNull(GraphQLID) },
    quantity: { type: new GraphQLNonNull(GraphQLInt) },
    notes: { type: GraphQLString },
    paid: { type: GraphQLBoolean },
    orderChoiceItemPrices: { type: new GraphQLList(new GraphQLNonNull(OrderChoiceItemPrice)) },
    servingTimeId: { type: GraphQLID },
    discount: { type: GraphQLFloat },
  },
});
