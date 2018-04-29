// @flow

import { GraphQLID, GraphQLFloat, GraphQLString, GraphQLInputObjectType } from 'graphql';

export default new GraphQLInputObjectType({
  name: 'PaymentGroupInput',
  fields: {
    id: { type: GraphQLID },
    discount: { type: GraphQLFloat },
    paidAt: { type: GraphQLString },
  },
});
