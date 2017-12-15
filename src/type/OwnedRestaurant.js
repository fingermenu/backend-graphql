// @flow

import { Map } from 'immutable';
import { GraphQLBoolean, GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import GeoLocation from './GeoLocation';
import Phone from './Phone';
import { NodeInterface } from '../interface';

const ParentOwnedRestaurant = new GraphQLObjectType({
  name: 'ParentOwnedRestaurant',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: _ => _.get('id'),
    },
    name: {
      type: GraphQLString,
      resolve: _ => _.get('name'),
    },
    websiteUrl: {
      type: GraphQLString,
      resolve: async (_) => {
        if (!_.has('id')) {
          return '';
        }

        return _.get('websiteUrl');
      },
    },
    imageUrl: {
      type: GraphQLString,
      resolve: async (_) => {
        if (!_.has('id')) {
          return '';
        }

        return _.get('imageUrl');
      },
    },
    address: {
      type: GraphQLString,
      resolve: _ => _.get('address'),
    },
    geoLocation: {
      type: GeoLocation,
      resolve: (_) => {
        const geoLocation = _.get('geoLocation');

        if (!geoLocation) {
          return null;
        }

        return Map({ latitude: geoLocation.latitude, longitude: geoLocation.longitude });
      },
    },
    phones: {
      type: new GraphQLList(new GraphQLNonNull(Phone)),
      resolve: (_) => {
        const phones = _.get('phones');

        if (!phones) {
          return [];
        }

        return phones.toArray();
      },
    },
    status: {
      type: GraphQLString,
      resolve: _ => _.get('status'),
    },
    googleMapUrl: {
      type: GraphQLString,
      resolve: _ => _.get('googleMapUrl'),
    },
    inheritParentRestaurantMenus: {
      type: GraphQLBoolean,
      resolve: _ => _.get('inheritParentRestaurantMenus'),
    },
  },
  interfaces: [NodeInterface],
});

export default new GraphQLObjectType({
  name: 'OwnedRestaurant',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: _ => _.get('id'),
    },
    name: {
      type: GraphQLString,
      resolve: _ => _.get('name'),
    },
    websiteUrl: {
      type: GraphQLString,
      resolve: async (_) => {
        if (!_.has('id')) {
          return '';
        }

        return _.get('websiteUrl');
      },
    },
    imageUrl: {
      type: GraphQLString,
      resolve: async (_) => {
        if (!_.has('id')) {
          return '';
        }

        return _.get('imageUrl');
      },
    },
    address: {
      type: GraphQLString,
      resolve: _ => _.get('address'),
    },
    geoLocation: {
      type: GeoLocation,
      resolve: (_) => {
        const geoLocation = _.get('geoLocation');

        if (!geoLocation) {
          return null;
        }

        return Map({ latitude: geoLocation.latitude, longitude: geoLocation.longitude });
      },
    },
    phones: {
      type: new GraphQLList(new GraphQLNonNull(Phone)),
      resolve: (_) => {
        const phones = _.get('phones');

        if (!phones) {
          return [];
        }

        return phones.toArray();
      },
    },
    status: {
      type: GraphQLString,
      resolve: _ => _.get('status'),
    },
    googleMapUrl: {
      type: GraphQLString,
      resolve: _ => _.get('googleMapUrl'),
    },
    inheritParentRestaurantMenus: {
      type: GraphQLBoolean,
      resolve: _ => _.get('inheritParentRestaurantMenus'),
    },
    parentRestaurant: {
      type: ParentOwnedRestaurant,
      resolve: (_, args, { dataLoaders }) => {
        const parentRestaurantId = _.get('parentRestaurantId');

        if (parentRestaurantId) {
          return dataLoaders.restaurantLoaderById.load(parentRestaurantId);
        }

        const parentRestaurant = _.get('parentRestaurant');

        if (parentRestaurant) {
          return parentRestaurant;
        }

        return null;
      },
    },
  },
  interfaces: [NodeInterface],
});
