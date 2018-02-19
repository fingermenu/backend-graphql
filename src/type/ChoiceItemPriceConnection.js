// @flow

import { ImmutableEx, RelayHelper } from '@microbusiness/common-javascript';
import { ChoiceItemPriceService } from '@fingermenu/parse-server-common';
import { Map } from 'immutable';
import { connectionDefinitions } from 'graphql-relay';
import ChoiceItemPrice from './ChoiceItemPrice';
import Common from './Common';

const getCriteria = (searchArgs, ownedByUserId) =>
  ImmutableEx.removeUndefinedProps(
    Map({
      ids: searchArgs.has('choiceItemPriceIds') ? searchArgs.get('choiceItemPriceIds') : undefined,
      conditions: Map({
        ownedByUserId,
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

const getChoiceItemPricesCountMatchCriteria = async (searchArgs, ownedByUserId, sessionToken) =>
  new ChoiceItemPriceService().count(addSortOptionToCriteria(getCriteria(searchArgs, ownedByUserId), searchArgs.get('sortOption')), sessionToken);

const getChoiceItemPricesMatchCriteria = async (searchArgs, ownedByUserId, sessionToken, limit, skip) =>
  new ChoiceItemPriceService().search(
    addSortOptionToCriteria(getCriteria(searchArgs, ownedByUserId), searchArgs.get('sortOption'))
      .set('limit', limit)
      .set('skip', skip),
    sessionToken,
  );

export const getChoiceItemPrices = async (searchArgs, { userLoaderBySessionToken, menuItemPriceLoaderById }, sessionToken) => {
  let finalSearchArgs = searchArgs;
  const menuItemPriceId = finalSearchArgs.get('menuItemPriceId');
  let menuItemPrice;

  if (menuItemPriceId) {
    menuItemPrice = await menuItemPriceLoaderById.load(menuItemPriceId);

    const choiceItemPriceIds = menuItemPrice.get('choiceItemPriceIds');

    if (!choiceItemPriceIds || choiceItemPriceIds.isEmpty()) {
      return Common.getEmptyResult();
    }

    finalSearchArgs = finalSearchArgs.set('choiceItemPriceIds', choiceItemPriceIds);
  }

  const userId = (await userLoaderBySessionToken.load(sessionToken)).id;
  const count = await getChoiceItemPricesCountMatchCriteria(finalSearchArgs, userId, sessionToken);

  if (count === 0) {
    return Common.getEmptyResult();
  }

  const { limit, skip, hasNextPage, hasPreviousPage } = RelayHelper.getLimitAndSkipValue(finalSearchArgs, count, 10, 1000);
  let results = await getChoiceItemPricesMatchCriteria(finalSearchArgs, userId, sessionToken, limit, skip);

  if (menuItemPrice) {
    const choiceItemPriceSortOrderIndices = menuItemPrice.get('choiceItemPriceSortOrderIndices');

    if (choiceItemPriceSortOrderIndices) {
      results = results.map(_ => _.set('sortOrderIndex', choiceItemPriceSortOrderIndices.get(_.get('id'))));
    }
  }

  return Common.convertResultsToRelayConnectionResponse(results, skip, limit, count, hasNextPage, hasPreviousPage);
};

export default connectionDefinitions({
  name: 'ChoiceItemPriceType',
  nodeType: ChoiceItemPrice,
});
