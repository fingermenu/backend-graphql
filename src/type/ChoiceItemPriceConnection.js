// @flow

import { Map, Range } from 'immutable';
import { connectionDefinitions } from 'graphql-relay';
import { RelayHelper } from '@microbusiness/common-javascript';
import { ChoiceItemPriceService } from '@fingermenu/parse-server-common';
import ChoiceItemPrice from './ChoiceItemPrice';

const getCriteria = (searchArgs, ownedByUserId) =>
  Map({
    ids: searchArgs.has('choiceItemPriceIds') ? searchArgs.get('choiceItemPriceIds') : undefined,
    conditions: Map({
      ownedByUserId,
    }),
  });

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

export const getChoiceItemPrices = async (searchArgs, dataLoaders, sessionToken) => {
  const userId = (await dataLoaders.userLoaderBySessionToken.load(sessionToken)).id;
  const count = await getChoiceItemPricesCountMatchCriteria(searchArgs, userId, sessionToken);
  const {
    limit, skip, hasNextPage, hasPreviousPage,
  } = RelayHelper.getLimitAndSkipValue(searchArgs, count, 10, 1000);
  const choiceItemPrices = await getChoiceItemPricesMatchCriteria(searchArgs, userId, sessionToken, limit, skip);
  const indexedChoiceItemPrices = choiceItemPrices.zip(Range(skip, skip + limit));

  const edges = indexedChoiceItemPrices.map(indexedItem => ({
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
  name: 'ChoiceItemPriceType',
  nodeType: ChoiceItemPrice,
});