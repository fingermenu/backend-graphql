// @flow

import { Map, Range } from 'immutable';
import { connectionDefinitions } from 'graphql-relay';
import { RelayHelper, StringHelper } from 'micro-business-common-javascript';
import { RestaurantService } from 'finger-menu-parse-server-common';
import OwnedRestaurant from './OwnedRestaurant';

const getCriteria = (searchArgs, ownedByUserId) =>
  Map({
    include_parentRestaurant: true,
    ids: searchArgs.has('ownedRestaurantIds') ? searchArgs.get('ownedRestaurantIds') : undefined,
    conditions: Map({
      ownedByUserId,
      contains_names: StringHelper.convertStringArgumentToSet(searchArgs.get('name')),
      status: searchArgs.has('status') ? searchArgs.get('status') : undefined,
      inheritParentRestaurantMenus: searchArgs.has('inheritParentRestaurantMenus') ? searchArgs.get('inheritParentRestaurantMenus') : undefined,
    }),
  });

const addSortOptionToCriteria = (criteria, sortOption) => {
  if (sortOption && sortOption.localeCompare('NameDescending') === 0) {
    return criteria.set('orderByFieldDescending', 'name');
  }

  if (sortOption && sortOption.localeCompare('NameAscending') === 0) {
    return criteria.set('orderByFieldAscending', 'name');
  }

  if (sortOption && sortOption.localeCompare('AddressDescending') === 0) {
    return criteria.set('orderByFieldDescending', 'address');
  }

  if (sortOption && sortOption.localeCompare('AddressAscending') === 0) {
    return criteria.set('orderByFieldAscending', 'address');
  }

  if (sortOption && sortOption.localeCompare('StatusDescending') === 0) {
    return criteria.set('orderByFieldDescending', 'status');
  }

  if (sortOption && sortOption.localeCompare('StatusAscending') === 0) {
    return criteria.set('orderByFieldAscending', 'status');
  }

  if (sortOption && sortOption.localeCompare('InheritParentRestaurantMenusDescending') === 0) {
    return criteria.set('orderByFieldDescending', 'inheritParentRestaurantMenus');
  }

  if (sortOption && sortOption.localeCompare('InheritParentRestaurantMenusAscending') === 0) {
    return criteria.set('orderByFieldAscending', 'inheritParentRestaurantMenus');
  }

  return criteria.set('orderByFieldAscending', 'name');
};

const getOwnedRestaurantsCountMatchCriteria = async (searchArgs, ownedByUserId, sessionToken) =>
  new RestaurantService().count(addSortOptionToCriteria(getCriteria(searchArgs, ownedByUserId), searchArgs.get('sortOption')), sessionToken);

const getOwnedRestaurantsMatchCriteria = async (searchArgs, ownedByUserId, sessionToken, limit, skip) =>
  new RestaurantService().search(
    addSortOptionToCriteria(getCriteria(searchArgs, ownedByUserId), searchArgs.get('sortOption'))
      .set('limit', limit)
      .set('skip', skip),
    sessionToken,
  );

export const getOwnedRestaurants = async (searchArgs, dataLoaders, sessionToken) => {
  const userId = (await dataLoaders.userLoaderBySessionToken.load(sessionToken)).id;
  const count = await getOwnedRestaurantsCountMatchCriteria(searchArgs, userId, sessionToken);
  const {
    limit, skip, hasNextPage, hasPreviousPage,
  } = RelayHelper.getLimitAndSkipValue(searchArgs, count, 10, 1000);
  const stores = await getOwnedRestaurantsMatchCriteria(searchArgs, userId, sessionToken, limit, skip);
  const indexedOwnedRestaurants = stores.zip(Range(skip, skip + limit));

  const edges = indexedOwnedRestaurants.map(indexedItem => ({
    node: indexedItem[0],
    cursor: indexedItem[1] + 1,
  }));

  const firstEdge = edges.first();
  const lastEdge = edges.last();

  return {
    edges: edges.toArray(),
    count,
    pageInfo: {
      startCursor: firstEdge ? firstEdge.cursor : 'cursor not available',
      endCursor: lastEdge ? lastEdge.cursor : 'cursor not available',
      hasPreviousPage,
      hasNextPage,
    },
  };
};

export default connectionDefinitions({
  name: 'OwnedRestaurantType',
  nodeType: OwnedRestaurant,
});
