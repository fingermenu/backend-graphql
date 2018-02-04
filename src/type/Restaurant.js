// @flow

import { Map } from 'immutable';
import { GraphQLBoolean, GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import { RestaurantService, TableService } from '@fingermenu/parse-server-common';
import GeoLocation from './GeoLocation';
import Phone from './Phone';
import Language from './Language';
import Menu from './Menu';
import Table from './Table';
import RestaurantConfigurations from './RestaurantConfigurations';
import { NodeInterface } from '../interface';

const getTableCriteria = restaurantId =>
  Map({
    conditions: Map({
      restaurantId,
    }),
  });

const getTablesMatchCriteria = async (restaurantId, sessionToken) =>
  new TableService().search(getTableCriteria(restaurantId).set('limit', 1000), sessionToken);

export const getRestaurant = async (restaurantId, sessionToken) => new RestaurantService().read(restaurantId, null, sessionToken);

const ParentRestaurant = new GraphQLObjectType({
  name: 'ParentRestaurant',
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
    websiteUrl: {
      type: GraphQLString,
      resolve: async _ => _.get('websiteUrl'),
    },
    imageUrl: {
      type: GraphQLString,
      resolve: async _ => _.get('imageUrl'),
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
    pin: {
      type: GraphQLString,
      resolve: async _ => _.get('pin'),
    },
    menus: {
      type: new GraphQLList(new GraphQLNonNull(Menu)),
      resolve: async (_, args, { dataLoaders }) => {
        const menuIds = _.get('menuIds');

        return !menuIds || menuIds.isEmpty() ? [] : dataLoaders.menuLoaderById.loadMany(menuIds.toArray());
      },
    },
    languages: {
      type: new GraphQLList(new GraphQLNonNull(Language)),
      resolve: async (_, args, { dataLoaders }) => {
        const languageIds = _.get('languageIds');

        return !languageIds || languageIds.isEmpty() ? [] : dataLoaders.languageLoaderById.loadMany(languageIds.toArray());
      },
    },
    tables: {
      type: new GraphQLList(new GraphQLNonNull(Table)),
      resolve: async (_, args, { sessionToken }) => (await getTablesMatchCriteria(_.get('id'), sessionToken)).toArray(),
    },
    configurations: {
      type: new GraphQLNonNull(RestaurantConfigurations),
      resolve: _ => (_.get('configurations') ? _.get('configurations') : Map()),
    },
  },
  interfaces: [NodeInterface],
});

export default new GraphQLObjectType({
  name: 'Restaurant',
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
    websiteUrl: {
      type: GraphQLString,
      resolve: async _ => _.get('websiteUrl'),
    },
    imageUrl: {
      type: GraphQLString,
      resolve: async _ => _.get('imageUrl'),
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
    pin: {
      type: GraphQLString,
      resolve: async _ => _.get('pin'),
    },
    menus: {
      type: new GraphQLList(new GraphQLNonNull(Menu)),
      resolve: async (_, args, { dataLoaders }) => {
        const menuIds = _.get('menuIds');

        return !menuIds || menuIds.isEmpty() ? [] : dataLoaders.menuLoaderById.loadMany(menuIds.toArray());
      },
    },
    languages: {
      type: new GraphQLList(new GraphQLNonNull(Language)),
      resolve: async (_, args, { dataLoaders }) => {
        const languageIds = _.get('languageIds');

        return !languageIds || languageIds.isEmpty() ? [] : dataLoaders.languageLoaderById.loadMany(languageIds.toArray());
      },
    },
    tables: {
      type: new GraphQLList(new GraphQLNonNull(Table)),
      resolve: async (_, args, { sessionToken }) => (await getTablesMatchCriteria(_.get('id'), sessionToken)).toArray(),
    },
    configurations: {
      type: new GraphQLNonNull(RestaurantConfigurations),
      resolve: _ => (_.get('configurations') ? _.get('configurations') : Map()),
    },
    parentRestaurant: {
      type: ParentRestaurant,
      resolve: async (_, args, { dataLoaders }) =>
        (_.get('parentRestaurantId') ? dataLoaders.restaurantLoaderById.load(_.get('parentRestaurantId')) : null),
    },
  },
  interfaces: [NodeInterface],
});
