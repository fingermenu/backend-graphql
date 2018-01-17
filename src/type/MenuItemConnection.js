// @flow

import { Map, Range } from 'immutable';
import { connectionDefinitions } from 'graphql-relay';
import { RelayHelper, StringHelper } from '@microbusiness/common-javascript';
import { MenuItemService } from '@fingermenu/parse-server-common';
import MenuItem from './MenuItem';

const getCriteria = (searchArgs, ownedByUserId, language) =>
  Map({
    language,
    ids: searchArgs.has('menuItemIds') ? searchArgs.get('menuItemIds') : undefined,
    conditions: Map({
      ownedByUserId,
      contains_names: StringHelper.convertStringArgumentToSet(searchArgs.get('name')),
      contains_descriptions: StringHelper.convertStringArgumentToSet(searchArgs.get('description')),
    }),
  });

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

  return criteria.set('orderByFieldAscending', 'name');
};

const getMenuItemsCountMatchCriteria = async (searchArgs, ownedByUserId, sessionToken, language) =>
  new MenuItemService().count(
    addSortOptionToCriteria(getCriteria(searchArgs, ownedByUserId, language), searchArgs.get('sortOption'), language),
    sessionToken,
  );

const getMenuItemsMatchCriteria = async (searchArgs, ownedByUserId, sessionToken, language, limit, skip) =>
  new MenuItemService().search(
    addSortOptionToCriteria(getCriteria(searchArgs, ownedByUserId, language), searchArgs.get('sortOption'), language)
      .set('limit', limit)
      .set('skip', skip),
    sessionToken,
  );

export const getMenuItems = async (searchArgs, dataLoaders, sessionToken, language) => {
  const userId = (await dataLoaders.userLoaderBySessionToken.load(sessionToken)).id;
  const count = await getMenuItemsCountMatchCriteria(searchArgs, userId, sessionToken, language);
  const {
    limit, skip, hasNextPage, hasPreviousPage,
  } = RelayHelper.getLimitAndSkipValue(searchArgs, count, 10, 1000);
  const menuItems = await getMenuItemsMatchCriteria(searchArgs, userId, sessionToken, language, limit, skip);
  const indexedMenuItems = menuItems.zip(Range(skip, skip + limit));

  const edges = indexedMenuItems.map(indexedItem => ({
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
  name: 'MenuItemType',
  nodeType: MenuItem,
});
