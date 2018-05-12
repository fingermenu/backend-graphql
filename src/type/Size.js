// @flow

import { SizeService } from '@fingermenu/parse-server-common';
import { GraphQLID, GraphQLObjectType, GraphQLNonNull } from 'graphql';
import { NodeInterface } from '../interface';
import Tag from './Tag';

export const getSize = async (sizeId, sessionToken) => new SizeService().read(sizeId, null, sessionToken);

export default new GraphQLObjectType({
  name: 'Size',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: _ => _.get('id'),
    },
    tag: {
      type: Tag,
      resolve: async (_, args, { dataLoaders: { tagLoaderById } }) => (_.get('tagId') ? tagLoaderById.load(_.get('tagId')) : null),
    },
  },
  interfaces: [NodeInterface],
});
