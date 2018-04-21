// @flow

import { ImmutableEx, RelayHelper, StringHelper } from '@microbusiness/common-javascript';
import { MenuItemService } from '@fingermenu/parse-server-common';
import { Map } from 'immutable';
import { connectionDefinitions } from 'graphql-relay';
import MenuItem from './MenuItem';
import Common from './Common';

const getCriteria = (searchArgs, ownedByUserId, language) =>
  ImmutableEx.removeUndefinedProps(
    Map({
      language,
      ids: searchArgs.has('menuItemIds') ? searchArgs.get('menuItemIds') : undefined,
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

const getMenuItemsCountMatchCriteria = async (searchArgs, ownedByUserId, sessionToken, language) =>
  new MenuItemService().count(
    addSortOptionToCriteria(getCriteria(searchArgs, ownedByUserId, language), searchArgs.get('sortOption'), language),
    sessionToken,
  );

const getMenuItemsMatchCriteria = async (searchArgs, ownedByUserId, sessionToken, language, limit, skip) =>
  new MenuItemService().search(
    addSortOptionToCriteria(getCriteria(searchArgs, ownedByUserId, language), searchArgs.get('sortOption'), language).merge(Map({ limit, skip })),
    sessionToken,
  );

export const getMenuItems = async (searchArgs, { userLoaderBySessionToken }, sessionToken, language) => {
  const userId = (await userLoaderBySessionToken.load(sessionToken)).id;
  const count = await getMenuItemsCountMatchCriteria(searchArgs, userId, sessionToken, language);

  if (count === 0) {
    return Common.getEmptyResult();
  }

  const { limit, skip, hasNextPage, hasPreviousPage } = RelayHelper.getLimitAndSkipValue(searchArgs, count, 10, 1000);
  const results = await getMenuItemsMatchCriteria(searchArgs, userId, sessionToken, language, limit, skip);

  return Common.convertResultsToRelayConnectionResponse(results, skip, limit, count, hasNextPage, hasPreviousPage);
};

export default connectionDefinitions({
  name: 'MenuItemType',
  nodeType: MenuItem,
});
