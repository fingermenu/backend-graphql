// @flow

import { GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import { MenuItemService } from '@fingermenu/parse-server-common';
import { NodeInterface } from '../interface';
import Tag from './Tag';

export const getMenuItem = async (menuItemId, sessionToken) => new MenuItemService().read(menuItemId, null, sessionToken);

export default new GraphQLObjectType({
  name: 'MenuItem',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: _ => _.get('id'),
    },
    name: {
      type: GraphQLString,
      resolve: (_, args, { language }) => {
        const allValues = _.get('name');

        return allValues ? allValues.get(`${language}_name`) : null;
      },
    },
    description: {
      type: GraphQLString,
      resolve: (_, args, { language }) => {
        const allValues = _.get('description');

        return allValues ? allValues.get(`${language}_description`) : null;
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
