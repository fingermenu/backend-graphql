// @flow

import { ImmutableEx, RelayHelper } from '@microbusiness/common-javascript';
import { MenuItemPriceService } from '@fingermenu/parse-server-common';
import { Map } from 'immutable';
import { connectionDefinitions } from 'graphql-relay';
import MenuItemPrice from './MenuItemPrice';
import Common from './Common';

const getCriteria = (searchArgs, addedByUserId) =>
  ImmutableEx.removeUndefinedProps(
    Map({
      ids: searchArgs.has('menuItemPriceIds') ? searchArgs.get('menuItemPriceIds') : undefined,
      conditions: Map({
        addedByUserId,
        doesNotExist_removedByUser: true,
      }),
    }),
  );

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

export const getMenuItemPrices = async (searchArgs, { userLoaderBySessionToken, menuLoaderById }, sessionToken) => {
  let finalSearchArgs = searchArgs;
  const menuId = finalSearchArgs.get('menuId');
  let menu;

  if (menuId) {
    menu = await menuLoaderById.load(menuId);

    const menuItemPriceIds = menu.get('menuItemPriceIds');

    if (!menuItemPriceIds || menuItemPriceIds.isEmpty()) {
      return Common.getEmptyResult();
    }

    finalSearchArgs = finalSearchArgs.set('menuItemPriceIds', menuItemPriceIds);
  }

  const userId = (await userLoaderBySessionToken.load(sessionToken)).id;
  const count = await getMenuItemPricesCountMatchCriteria(finalSearchArgs, userId, sessionToken);

  if (count === 0) {
    return Common.getEmptyResult();
  }

  const { limit, skip, hasNextPage, hasPreviousPage } = RelayHelper.getLimitAndSkipValue(finalSearchArgs, count, 10, 1000);
  let results = await getMenuItemPricesMatchCriteria(finalSearchArgs, userId, sessionToken, limit, skip);

  if (menu) {
    const menuItemPriceSortOrderIndices = menu.get('menuItemPriceSortOrderIndices');

    if (menuItemPriceSortOrderIndices) {
      results = results.map(_ => _.set('sortOrderIndex', menuItemPriceSortOrderIndices.get(_.get('id'))));
    }
  }

  return Common.convertResultsToRelayConnectionResponse(results, skip, limit, count, hasNextPage, hasPreviousPage);
};

export default connectionDefinitions({
  name: 'MenuItemPriceType',
  nodeType: MenuItemPrice,
});
