// @flow

import { List, Map } from 'immutable';
import { GraphQLBoolean, GraphQLList, GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { RestaurantConnection, getRestaurants } from '../type';
import { addRestaurant } from './RestaurantHelper';
import LanguageStringTuple from './LanguageStringTuple';
import logUserRequest from './RequestLogHelper';

export default mutationWithClientMutationId({
  name: 'AddRestaurant',
  inputFields: {
    appVersion: { type: GraphQLString },
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
    restaurant: {
      type: RestaurantConnection.edgeType,
      resolve: _ => _.get('restaurant'),
    },
  },
  mutateAndGetPayload: async (args, { dataLoaders, sessionToken, language }) => {
    logUserRequest(args, 'Mutation - Add Restaurant', dataLoaders, sessionToken);

    const restaurantId = await addRestaurant(args, dataLoaders, sessionToken);

    return Map({
      restaurant: (await getRestaurants(Map({ RestaurantIds: List.of(restaurantId) }), dataLoaders, sessionToken, language)).edges[0],
    });
  },
});
