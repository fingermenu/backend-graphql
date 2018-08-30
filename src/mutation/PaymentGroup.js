// @flow

import { GraphQLID, GraphQLFloat, GraphQLString, GraphQLInputObjectType } from 'graphql';

export default new GraphQLInputObjectType({
  name: 'PaymentGroupInput',
  fields: {
    paymentGroupId: { type: GraphQLID },
    discount: { type: GraphQLFloat },
    eftpos: {
      type: GraphQLFloat,
    },
    cash: {
      type: GraphQLFloat,
    },
    paidAt: { type: GraphQLString },
  },
});
