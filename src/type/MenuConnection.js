// @flow

import { ImmutableEx, RelayHelper, StringHelper } from '@microbusiness/common-javascript';
import { MenuService } from '@fingermenu/parse-server-common';
import { Map } from 'immutable';
import { connectionDefinitions } from 'graphql-relay';
import Menu from './Menu';
import Common from './Common';

const getCriteria = (searchArgs, ownedByUserId, language) =>
  ImmutableEx.removeUndefinedProps(
    Map({
      language,
      ids: searchArgs.has('menuIds') ? searchArgs.get('menuIds') : undefined,
      conditions: Map({
        ownedByUserId,
        contains_names: StringHelper.convertStringArgumentToSet(searchArgs.get('name')),
        contains_descriptions: StringHelper.convertStringArgumentToSet(searchArgs.get('description')),
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

  if (sortOption && sortOption.localeCompare('DescriptionDescending') === 0) {
    return criteria.set('orderByFieldDescending', `${language}_description`);
  }

  if (sortOption && sortOption.localeCompare('DescriptionAscending') === 0) {
    return criteria.set('orderByFieldAscending', `${language}_description`);
  }

  return criteria.set('orderByFieldAscending', `${language}_name`);
};

const getMenusCountMatchCriteria = async (searchArgs, ownedByUserId, sessionToken, language) =>
  new MenuService().count(
    addSortOptionToCriteria(getCriteria(searchArgs, ownedByUserId, language), searchArgs.get('sortOption'), language),
    sessionToken,
  );

const getMenusMatchCriteria = async (searchArgs, ownedByUserId, sessionToken, language, limit, skip) =>
  new MenuService().search(
    addSortOptionToCriteria(getCriteria(searchArgs, ownedByUserId, language), searchArgs.get('sortOption'), language).merge(Map({ limit, skip })),
    sessionToken,
  );

export const getMenus = async (searchArgs, { restaurantLoaderById, userLoaderBySessionToken }, sessionToken, language) => {
  let finalSearchArgs = searchArgs;
  const restaurantId = finalSearchArgs.get('restaurantId');
  let restaurant;

  if (restaurantId) {
    restaurant = await restaurantLoaderById.load(restaurantId);

    const menuIds = restaurant.get('menuIds');

    if (!menuIds || menuIds.isEmpty()) {
      return Common.getEmptyResult();
    }

    finalSearchArgs = finalSearchArgs.set('menuIds', menuIds);
  }

  const userId = (await userLoaderBySessionToken.load(sessionToken)).id;
  const count = await getMenusCountMatchCriteria(finalSearchArgs, userId, sessionToken, language);

  if (count === 0) {
    return Common.getEmptyResult();
  }

  const { limit, skip, hasNextPage, hasPreviousPage } = RelayHelper.getLimitAndSkipValue(finalSearchArgs, count, 10, 1000);
  let results = await getMenusMatchCriteria(finalSearchArgs, userId, sessionToken, language, limit, skip);

  if (restaurant) {
    const menuSortOrderIndices = restaurant.get('menuSortOrderIndices');

    if (menuSortOrderIndices) {
      results = results.map(_ => _.set('sortOrderIndex', menuSortOrderIndices.get(_.get('id'))));
    }
  }

  return Common.convertResultsToRelayConnectionResponse(results, skip, limit, count, hasNextPage, hasPreviousPage);
};

export default connectionDefinitions({
  name: 'MenuType',
  nodeType: Menu,
});
