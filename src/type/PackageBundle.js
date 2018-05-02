// @flow

import { GraphQLString, GraphQLObjectType } from 'graphql';

export default new GraphQLObjectType({
  name: 'PackageBundle',
  fields: {
    url: {
      type: GraphQLString,
      resolve: _ => _.get('url'),
    },
    checksum: {
      type: GraphQLString,
      resolve: _ => _.get('checksum'),
    },
  },
});
