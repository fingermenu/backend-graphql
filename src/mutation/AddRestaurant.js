// @flow

import { List, Map } from 'immutable';
import { GraphQLBoolean, GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { OwnedRestaurantConnection, getOwnedRestaurants } from '../type';
import { addRestaurant } from './RestaurantHelper';

export default mutationWithClientMutationId({
  name: 'AddRestaurant',
  inputFields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    websiteUrl: { type: GraphQLString },
    imageUrl: { type: GraphQLString },
    address: { type: GraphQLString },
    googleMapUrl: { type: GraphQLString },
    status: { type: GraphQLString },
    inheritParentRestaurantMenus: { type: GraphQLBoolean },
  },
  outputFields: {
    errorMessage: {
      type: GraphQLString,
      resolve: _ => _.get('errorMessage'),
    },
    restaurant: {
      type: OwnedRestaurantConnection.edgeType,
      resolve: _ => _.get('ownedRestaurant'),
    },
  },
  mutateAndGetPayload: async (args, { sessionToken, dataLoaders }) => {
    try {
      const restaurantId = await addRestaurant(args, dataLoaders, sessionToken);

      return Map({
        ownedRestaurant: (await getOwnedRestaurants(Map({ ownedRestaurantIds: List.of(restaurantId) }), dataLoaders, sessionToken)).edges[0],
      });
    } catch (ex) {
      return Map({ errorMessage: ex instanceof Error ? ex.message : ex });
    }
  },
});
