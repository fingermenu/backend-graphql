// @flow

import { GraphQLBoolean, GraphQLID, GraphQLInt, GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import { TagService } from '@fingermenu/parse-server-common';
import { NodeInterface } from '../interface';

export const getTag = async (tagId, sessionToken) => new TagService().read(tagId, null, sessionToken);

const ParentTag = new GraphQLObjectType({
  name: 'ParentTag',
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

export default new GraphQLObjectType({
  name: 'Tag',
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
    parentTag: {
      type: ParentTag,
      resolve: (_, args, { dataLoaders }) => {
        const parentTagId = _.get('parentTagId');

        if (parentTagId) {
          return dataLoaders.tagLoaderById.load(parentTagId);
        }

        return null;
      },
    },
  },
  interfaces: [NodeInterface],
});
