// @flow

import { GraphQLID, GraphQLString, GraphQLInputObjectType } from 'graphql';

export default new GraphQLInputObjectType({
  name: 'CustomerInput',
  fields: {
    customerId: { type: GraphQLID },
    name: { type: GraphQLString },
    type: { type: GraphQLString },
  },
});
