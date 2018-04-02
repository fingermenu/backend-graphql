// @flow

import { List, Map } from 'immutable';
import { GraphQLList, GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { MenuItemConnection, getMenuItems } from '../type';
import { addMenuItem } from './MenuItemHelper';
import LanguageStringTuple from './LanguageStringTuple';

export default mutationWithClientMutationId({
  name: 'AddMenuItem',
  inputFields: {
    name: { type: new GraphQLNonNull(new GraphQLList(LanguageStringTuple)) },
    description: { type: new GraphQLList(LanguageStringTuple) },
    menuItemPageUrl: { type: GraphQLString },
    imageUrl: { type: GraphQLString },
  },
  outputFields: {
    menuItem: {
      type: MenuItemConnection.edgeType,
      resolve: _ => _.get('menuItem'),
    },
  },
  mutateAndGetPayload: async (args, { dataLoaders, sessionToken, language }) => {
    const menuItemId = await addMenuItem(args, dataLoaders, sessionToken);

    return Map({
      menuItem: (await getMenuItems(Map({ MenuItemIds: List.of(menuItemId) }), dataLoaders, sessionToken, language)).edges[0],
    });
  },
});
