// @flow

import Immutable from 'immutable';
import { GraphQLBoolean, GraphQLID, GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLList } from 'graphql';
import { connectionArgs } from 'graphql-relay';
import { NodeInterface } from '../interface';
import OwnedRestaurantConnection, { getOwnedRestaurants } from './OwnedRestaurantConnection';

export default new GraphQLObjectType({
  name: 'User',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: _ => _.get('id'),
    },
    ownedRestaurants: {
      type: OwnedRestaurantConnection.connectionType,
      args: {
        ...connectionArgs,
        ownedRestaurantIds: {
          type: new GraphQLList(new GraphQLNonNull(GraphQLID)),
        },
        name: {
          type: GraphQLString,
        },
        status: {
          type: GraphQLBoolean,
        },
        inheritParentRestaurantMenus: {
          type: GraphQLBoolean,
        },
        sortOption: {
          type: GraphQLString,
        },
      },
      resolve: async (_, args, { sessionToken, dataLoaders }) => getOwnedRestaurants(Immutable.fromJS(args), dataLoaders, sessionToken),
    },
  },
  interfaces: [NodeInterface],
});
