// @flow

import { GraphQLBoolean, GraphQLFloat, GraphQLNonNull, GraphQLID, GraphQLInt, GraphQLList, GraphQLString, GraphQLInputObjectType } from 'graphql';
import Customer from './Customer';
import PaymentGroup from './PaymentGroup';
import OrderChoiceItemPrice from './OrderChoiceItemPrice';

export default new GraphQLInputObjectType({
  name: 'OrderMenuItemPriceInput',
  fields: {
    orderMenuItemPriceId: { type: GraphQLID },
    groupId: { type: GraphQLID },
    customer: { type: Customer },
    paymentGroup: { type: PaymentGroup },
    menuItemPriceId: { type: new GraphQLNonNull(GraphQLID) },
    quantity: { type: new GraphQLNonNull(GraphQLInt) },
    notes: { type: GraphQLString },
    paid: { type: GraphQLBoolean },
    orderChoiceItemPrices: { type: new GraphQLList(new GraphQLNonNull(OrderChoiceItemPrice)) },
    servingTimeId: { type: GraphQLID },
    discount: { type: GraphQLFloat },
  },
});
