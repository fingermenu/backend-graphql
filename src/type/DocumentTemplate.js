// @flow

import { GraphQLInt, GraphQLString, GraphQLObjectType, GraphQLNonNull } from 'graphql';

export default new GraphQLObjectType({
  name: 'DocumentTemplate',
  fields: {
    name: {
      type: GraphQLString,
      resolve: _ => _.get('name'),
    },
    maxLineWidthDivisionFactor: {
      type: GraphQLInt,
      resolve: _ => _.get('maxLineWidthDivisionFactor'),
    },
    template: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: _ => _.get('template'),
    },
  },
});
