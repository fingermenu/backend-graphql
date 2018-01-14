// @flow

import { List, Map } from 'immutable';
import { GraphQLBoolean, GraphQLList, GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { RestaurantConnection, getRestaurants } from '../type';
import { addRestaurant } from './RestaurantHelper';
import LanguageStringTuple from './LanguageStringTuple';

export default mutationWithClientMutationId({
  name: 'AddRestaurant',
  inputFields: {
    name: { type: new GraphQLNonNull(new GraphQLList(LanguageStringTuple)) },
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
      type: RestaurantConnection.edgeType,
      resolve: _ => _.get('Restaurant'),
    },
  },
  mutateAndGetPayload: async (args, { sessionToken, dataLoaders }) => {
    try {
      const restaurantId = await addRestaurant(args, dataLoaders, sessionToken);

      return Map({
        Restaurant: (await getRestaurants(Map({ RestaurantIds: List.of(restaurantId) }), dataLoaders, sessionToken)).edges[0],
      });
    } catch (ex) {
      return Map({ errorMessage: ex instanceof Error ? ex.message : ex });
    }
  },
});
