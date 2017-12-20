// @flow

import { List, Map } from 'immutable';
import { GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { MenuItemConnection, getMenuItems } from '../type';
import { addMenuItem } from './MenuItemHelper';

export default mutationWithClientMutationId({
  name: 'AddMenuItem',
  inputFields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: new GraphQLNonNull(GraphQLString) },
    menuItemPageUrl: { type: GraphQLString },
    imageUrl: { type: GraphQLString },
  },
  outputFields: {
    errorMessage: {
      type: GraphQLString,
      resolve: _ => _.get('errorMessage'),
    },
    menuItem: {
      type: MenuItemConnection.edgeType,
      resolve: _ => _.get('MenuItem'),
    },
  },
  mutateAndGetPayload: async (args, { sessionToken, dataLoaders }) => {
    try {
      const menuItemId = await addMenuItem(args, dataLoaders, sessionToken);

      return Map({
        MenuItem: (await getMenuItems(Map({ MenuItemIds: List.of(menuItemId) }), dataLoaders, sessionToken)).edges[0],
      });
    } catch (ex) {
      return Map({ errorMessage: ex instanceof Error ? ex.message : ex });
    }
  },
});
