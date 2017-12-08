// @flow

import { GraphQLID, GraphQLObjectType, GraphQLNonNull } from 'graphql';
import { NodeInterface } from '../interface';

export default new GraphQLObjectType({
  name: 'Viewer',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: _ => _.get('id'),
    },
  },
  interfaces: [NodeInterface],
});
