// @flow

import { ImmutableEx, RelayHelper } from '@microbusiness/common-javascript';
import { MenuItemPriceService } from '@fingermenu/parse-server-common';
import { Map, Range } from 'immutable';
import { connectionDefinitions } from 'graphql-relay';
import MenuItemPrice from './MenuItemPrice';

const getCriteria = (searchArgs, addedByUserId) =>
  ImmutableEx.removeUndefinedProps(Map({
    ids: searchArgs.has('menuItemPriceIds') ? searchArgs.get('menuItemPriceIds') : undefined,
    conditions: Map({
      addedByUserId,
      doesNotExist_removedByUser: true,
    }),
  }));

const addSortOptionToCriteria = (criteria, sortOption) => {
  if (sortOption && sortOption.localeCompare('CurrentPriceDescending') === 0) {
    return criteria.set('orderByFieldDescending', 'currentPrice');
  }

  if (sortOption && sortOption.localeCompare('CurrentPriceAscending') === 0) {
    return criteria.set('orderByFieldAscending', 'currentPrice');
  }

  if (sortOption && sortOption.localeCompare('WasPriceDescending') === 0) {
    return criteria.set('orderByFieldDescending', 'wasPrice');
  }

  if (sortOption && sortOption.localeCompare('WasPriceAscending') === 0) {
    return criteria.set('orderByFieldAscending', 'wasPrice');
  }

  if (sortOption && sortOption.localeCompare('ValidFromDescending') === 0) {
    return criteria.set('orderByFieldDescending', 'validFrom');
  }

  if (sortOption && sortOption.localeCompare('ValidFromAscending') === 0) {
    return criteria.set('orderByFieldAscending', 'validFrom');
  }

  if (sortOption && sortOption.localeCompare('ValidUntilDescending') === 0) {
    return criteria.set('orderByFieldDescending', 'validUntil');
  }

  if (sortOption && sortOption.localeCompare('ValidUntilAscending') === 0) {
    return criteria.set('orderByFieldAscending', 'validUntil');
  }

  return criteria.set('orderByFieldAscending', 'currentPrice');
};

const getMenuItemPricesCountMatchCriteria = async (searchArgs, addedByUserId, sessionToken) =>
  new MenuItemPriceService().count(addSortOptionToCriteria(getCriteria(searchArgs, addedByUserId), searchArgs.get('sortOption')), sessionToken);

const getMenuItemPricesMatchCriteria = async (searchArgs, addedByUserId, sessionToken, limit, skip) =>
  new MenuItemPriceService().search(
    addSortOptionToCriteria(getCriteria(searchArgs, addedByUserId), searchArgs.get('sortOption'))
      .set('limit', limit)
      .set('skip', skip),
    sessionToken,
  );

export const getMenuItemPrices = async (searchArgs, dataLoaders, sessionToken) => {
  let finalSearchArgs = searchArgs;
  const menuId = finalSearchArgs.get('menuId');

  if (menuId) {
    const menuItemPriceIds = (await dataLoaders.menuLoaderById.load(menuId)).get('menuItemPriceIds');

    if (!menuItemPriceIds || menuItemPriceIds.isEmpty()) {
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

    finalSearchArgs = finalSearchArgs.set('menuItemPriceIds', menuItemPriceIds);
  }

  const userId = (await dataLoaders.userLoaderBySessionToken.load(sessionToken)).id;
  const count = await getMenuItemPricesCountMatchCriteria(finalSearchArgs, userId, sessionToken);
  const {
    limit, skip, hasNextPage, hasPreviousPage,
  } = RelayHelper.getLimitAndSkipValue(finalSearchArgs, count, 10, 1000);
  const menuItemPrices = await getMenuItemPricesMatchCriteria(finalSearchArgs, userId, sessionToken, limit, skip);
  const indexedMenuItemPrices = menuItemPrices.zip(Range(skip, skip + limit));

  const edges = indexedMenuItemPrices.map(indexedItem => ({
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
  name: 'MenuItemPriceType',
  nodeType: MenuItemPrice,
});
