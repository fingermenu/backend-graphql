// @flow

import { GraphQLID, GraphQLFloat, GraphQLString, GraphQLObjectType } from 'graphql';

export default new GraphQLObjectType({
  name: 'PaymentGroup',
  fields: {
    paymentGroupId: {
      type: GraphQLID,
      resolve: _ => _.get('paymentGroupId'),
    },
    discount: {
      type: GraphQLFloat,
      resolve: _ => _.get('discount'),
    },
    paidAt: {
      type: GraphQLString,
      resolve: _ => (_.get('paidAt') ? _.get('paidAt') : null),
    },
  },
});
