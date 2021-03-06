// @flow

import { GraphQLString, GraphQLNonNull, GraphQLObjectType } from 'graphql';

export default new GraphQLObjectType({
  name: 'StringWithLanguage',
  fields: {
    language: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: _ => _.get('language'),
    },
    value: {
      type: GraphQLString,
      resolve: _ => _.get('value'),
    },
  },
});
