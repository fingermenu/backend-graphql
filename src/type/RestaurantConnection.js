// @flow

import { ImmutableEx, RelayHelper, StringHelper } from '@microbusiness/common-javascript';
import { RestaurantService } from '@fingermenu/parse-server-common';
import { Map } from 'immutable';
import { connectionDefinitions } from 'graphql-relay';
import Restaurant from './Restaurant';
import Common from './Common';

const getCriteria = (searchArgs, ownedByUserId, language) =>
  ImmutableEx.removeUndefinedProps(
    Map({
      language,
      ids: searchArgs.has('restaurantIds') ? searchArgs.get('restaurantIds') : undefined,
      conditions: Map({
        ownedByUserId,
        contains_names: StringHelper.convertStringArgumentToSet(searchArgs.get('name')),
        status: searchArgs.has('status') ? searchArgs.get('status') : undefined,
        inheritParentRestaurantMenus: searchArgs.has('inheritParentRestaurantMenus') ? searchArgs.get('inheritParentRestaurantMenus') : undefined,
      }),
    }),
  );

const addSortOptionToCriteria = (criteria, sortOption, language) => {
  if (sortOption && sortOption.localeCompare('NameDescending') === 0) {
    return criteria.set('orderByFieldDescending', `${language}_name`);
  }

  if (sortOption && sortOption.localeCompare('NameAscending') === 0) {
    return criteria.set('orderByFieldAscending', `${language}_name`);
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

  return criteria.set('orderByFieldAscending', `${language}_name`);
};

const getRestaurantsCountMatchCriteria = async (searchArgs, ownedByUserId, sessionToken, language) =>
  new RestaurantService().count(
    addSortOptionToCriteria(getCriteria(searchArgs, ownedByUserId, language), searchArgs.get('sortOption'), language),
    sessionToken,
  );

const getRestaurantsMatchCriteria = async (searchArgs, ownedByUserId, sessionToken, language, limit, skip) =>
  new RestaurantService().search(
    addSortOptionToCriteria(getCriteria(searchArgs, ownedByUserId, language), searchArgs.get('sortOption'), language)
      .set('limit', limit)
      .set('skip', skip),
    sessionToken,
  );

export const getRestaurants = async (searchArgs, { userLoaderBySessionToken }, sessionToken, language) => {
  const userId = (await userLoaderBySessionToken.load(sessionToken)).id;
  const count = await getRestaurantsCountMatchCriteria(searchArgs, userId, sessionToken, language);

  if (count === 0) {
    return Common.getEmptyResult();
  }

  const { limit, skip, hasNextPage, hasPreviousPage } = RelayHelper.getLimitAndSkipValue(searchArgs, count, 10, 1000);
  const results = await getRestaurantsMatchCriteria(searchArgs, userId, sessionToken, language, limit, skip);

  return Common.convertResultsToRelayConnectionResponse(results, skip, limit, count, hasNextPage, hasPreviousPage);
};

export default connectionDefinitions({
  name: 'RestaurantType',
  nodeType: Restaurant,
});
