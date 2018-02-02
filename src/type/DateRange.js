// @flow

import { GraphQLString, GraphQLNonNull, GraphQLInputObjectType } from 'graphql';

export default new GraphQLInputObjectType({
  name: 'DateRange',
  fields: {
    from: { type: new GraphQLNonNull(GraphQLString) },
    to: { type: new GraphQLNonNull(GraphQLString) },
  },
});
