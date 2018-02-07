// @flow

import { SizeService } from '@fingermenu/parse-server-common';
import { GraphQLBoolean, GraphQLID, GraphQLInt, GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import { NodeInterface } from '../interface';

export const getSize = async (sizeId, sessionToken) => new SizeService().read(sizeId, null, sessionToken);

export default new GraphQLObjectType({
  name: 'Size',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: _ => _.get('id'),
    },
    name: {
      type: GraphQLString,
      resolve: (_, args, { language }) => {
        const allValues = _.get('name');

        return allValues ? allValues.get(language) : null;
      },
    },
    description: {
      type: GraphQLString,
      resolve: (_, args, { language }) => {
        const allValues = _.get('description');

        return allValues ? allValues.get(language) : null;
      },
    },
    imageUrl: {
      type: GraphQLString,
      resolve: async _ => _.get('imageUrl'),
    },
    level: {
      type: GraphQLInt,
      resolve: async _ => _.get('level'),
    },
    forDisplay: {
      type: GraphQLBoolean,
      resolve: async _ => _.get('forDisplay'),
    },
  },
  interfaces: [NodeInterface],
});
