// @flow

import { DietaryOptionService } from '@fingermenu/parse-server-common';
import { GraphQLID, GraphQLObjectType, GraphQLNonNull } from 'graphql';
import { NodeInterface } from '../interface';
import Tag from './Tag';

export const getDietaryOption = async (serviceTimeId, sessionToken) => new DietaryOptionService().read(serviceTimeId, null, sessionToken);

export default new GraphQLObjectType({
  name: 'DietaryOption',
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
