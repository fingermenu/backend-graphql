// @flow

import { GraphQLString, GraphQLObjectType } from 'graphql';

export default new GraphQLObjectType({
  name: 'RestaurantLanguages',
  fields: {
    display: {
      type: GraphQLString,
      resolve: _ => _.get('display'),
    },
    printOnCustomerReceipt: {
      type: GraphQLString,
      resolve: _ => _.get('printOnCustomerReceipt'),
    },
    printOnKitchenReceipt: {
      type: GraphQLString,
      resolve: _ => _.get('printOnKitchenReceipt'),
    },
  },
});
