// @flow

import { GraphQLInt, GraphQLString, GraphQLObjectType, GraphQLNonNull } from 'graphql';

export default new GraphQLObjectType({
  name: 'LinkedPrinter',
  fields: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: _ => _.get('name'),
    },
    language: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: _ => _.get('language'),
    },
    numberOfPrints: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: _ => (_.get('numberOfPrints') ? _.get('numberOfPrints') : 1),
    },
  },
});
