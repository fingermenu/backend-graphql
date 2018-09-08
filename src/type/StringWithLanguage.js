// @flow

import { GraphQLString, GraphQLNonNull, GraphQLObjectType } from 'graphql';

export default new GraphQLObjectType({
  name: 'StringWithLanguage',
  fields: {
    language: { type: new GraphQLNonNull(GraphQLString) },
    value: { type: GraphQLString },
  },
});
