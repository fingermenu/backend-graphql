// @flow

import { GraphQLID, GraphQLString, GraphQLObjectType } from 'graphql';

export default new GraphQLObjectType({
  name: 'Customer',
  fields: {
    id: {
      type: GraphQLID,
      resolve: _ => _.get('id'),
    },
    name: {
      type: GraphQLString,
      resolve: _ => _.get('name'),
    },
    type: {
      type: GraphQLString,
      resolve: _ => _.get('type'),
    },
  },
});
