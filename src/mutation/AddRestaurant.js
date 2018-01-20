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
    pin: { type: GraphQLString },
  },
  outputFields: {
    errorMessage: {
      type: GraphQLString,
      resolve: _ => _.get('errorMessage'),
    },
    restaurant: {
      type: RestaurantConnection.edgeType,
      resolve: _ => _.get('restaurant'),
    },
  },
  mutateAndGetPayload: async (args, { dataLoaders, sessionToken, language }) => {
    try {
      const restaurantId = await addRestaurant(args, dataLoaders, sessionToken);

      return Map({
        restaurant: (await getRestaurants(Map({ RestaurantIds: List.of(restaurantId) }), dataLoaders, sessionToken, language)).edges[0],
      });
    } catch (ex) {
      return Map({ errorMessage: ex instanceof Error ? ex.message : ex });
    }
  },
});
