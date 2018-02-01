// @flow

import { Map, Range } from 'immutable';
import { connectionDefinitions } from 'graphql-relay';
import { RelayHelper, StringHelper } from '@microbusiness/common-javascript';
import { MenuService } from '@fingermenu/parse-server-common';
import Menu from './Menu';

const getCriteria = (searchArgs, ownedByUserId, language) =>
  Map({
    language,
    ids: searchArgs.has('menuIds') ? searchArgs.get('menuIds') : undefined,
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

  return criteria.set('orderByFieldAscending', `${language}_name`);
};

const getMenusCountMatchCriteria = async (searchArgs, ownedByUserId, sessionToken, language) =>
  new MenuService().count(
    addSortOptionToCriteria(getCriteria(searchArgs, ownedByUserId, language), searchArgs.get('sortOption'), language),
    sessionToken,
  );

const getMenusMatchCriteria = async (searchArgs, ownedByUserId, sessionToken, language, limit, skip) =>
  new MenuService().search(
    addSortOptionToCriteria(getCriteria(searchArgs, ownedByUserId, language), searchArgs.get('sortOption'), language)
      .set('limit', limit)
      .set('skip', skip),
    sessionToken,
  );

export const getMenus = async (searchArgs, dataLoaders, sessionToken, language) => {
  let finalSearchArgs = searchArgs;
  const restaurantId = finalSearchArgs.get('restaurantId');

  if (restaurantId) {
    const menuIds = (await dataLoaders.restaurantLoaderById.load(restaurantId)).get('menuIds');

    if (!menuIds || menuIds.isEmpty()) {
      return {
        edges: [],
        count: 0,
        pageInfo: {
          startCursor: 'cursor not available',
          endCursor: 'cursor not available',
          hasPreviousPage: false,
          hasNextPage: false,
        },
      };
    }

    finalSearchArgs = finalSearchArgs.set('menuIds', menuIds);
  }

  const userId = (await dataLoaders.userLoaderBySessionToken.load(sessionToken)).id;
  const count = await getMenusCountMatchCriteria(finalSearchArgs, userId, sessionToken, language);
  const {
    limit, skip, hasNextPage, hasPreviousPage,
  } = RelayHelper.getLimitAndSkipValue(finalSearchArgs, count, 10, 1000);
  const menus = await getMenusMatchCriteria(finalSearchArgs, userId, sessionToken, language, limit, skip);
  const indexedMenus = menus.zip(Range(skip, skip + limit));

  const edges = indexedMenus.map(indexedItem => ({
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
  name: 'MenuType',
  nodeType: Menu,
});
