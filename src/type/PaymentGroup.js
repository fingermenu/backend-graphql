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
    eftpos: {
      type: GraphQLFloat,
      resolve: _ => _.get('eftpos'),
    },
    cash: {
      type: GraphQLFloat,
      resolve: _ => _.get('cash'),
    },
    paidAt: {
      type: GraphQLString,
      resolve: _ => (_.get('paidAt') ? _.get('paidAt') : null),
    },
  },
});
