// @flow

import { GraphQLString, GraphQLObjectType } from 'graphql';

export default new GraphQLObjectType({
  name: 'RestaurantLanguages',
  fields: {
    display: {
      type: GraphQLString,
      resolve: _ => _.get('display'),
    },
    printToKitchen: {
      type: GraphQLString,
      resolve: _ => _.get('printToKitchen'),
    },
    printOnReceipt: {
      type: GraphQLString,
      resolve: _ => _.get('printOnReceipt'),
    },
  },
});
