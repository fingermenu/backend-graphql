// @flow

import { GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import { ChoiceItemService } from '@fingermenu/parse-server-common';
import { NodeInterface } from '../interface';
import Tag from './Tag';

export const getChoiceItem = async (choiceItemId, sessionToken) => new ChoiceItemService().read(choiceItemId, null, sessionToken);

export default new GraphQLObjectType({
  name: 'ChoiceItem',
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
    menuItemPageUrl: {
      type: GraphQLString,
      resolve: async _ => _.get('menuItemPageUrl'),
    },
    imageUrl: {
      type: GraphQLString,
      resolve: async _ => _.get('imageUrl'),
    },
    tags: {
      type: new GraphQLList(new GraphQLNonNull(Tag)),
      resolve: async (_, args, { dataLoaders }) => dataLoaders.tagLoaderById.loadMany(_.get('tagIds').toArray()),
    },
  },
  interfaces: [NodeInterface],
});
