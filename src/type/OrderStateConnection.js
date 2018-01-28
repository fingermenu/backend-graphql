// @flow

import { Map, Range } from 'immutable';
import { connectionDefinitions } from 'graphql-relay';
import { RelayHelper, StringHelper } from '@microbusiness/common-javascript';
import { OrderStateService } from '@fingermenu/parse-server-common';
import OrderState from './OrderState';

const getCriteria = (searchArgs, language) =>
  Map({
    language,
    ids: searchArgs.has('orderStateIds') ? searchArgs.get('orderStateIds') : undefined,
    conditions: Map({
      contains_names: StringHelper.convertStringArgumentToSet(searchArgs.get('name')),
    }),
  }).merge(searchArgs.has('key')
    ? Map({
      conditions: Map({
        key: searchArgs
          .get('key')
          .trim()
          .toLowerCase(),
      }),
    })
    : Map());

const addSortOptionToCriteria = (criteria, sortOption, language) => {
  if (sortOption && sortOption.localeCompare('NameDescending') === 0) {
    return criteria.set('orderByFieldDescending', `${language}_name`);
  }

  if (sortOption && sortOption.localeCompare('NameAscending') === 0) {
    return criteria.set('orderByFieldAscending', `${language}_name`);
  }

  return criteria.set('orderByFieldAscending', `${language}_name`);
};

const getOrderStatesCountMatchCriteria = async (searchArgs, sessionToken, language) =>
  new OrderStateService().count(addSortOptionToCriteria(getCriteria(searchArgs, language), searchArgs.get('sortOption'), language), sessionToken);

const getOrderStatesMatchCriteria = async (searchArgs, sessionToken, language, limit, skip) =>
  new OrderStateService().search(
    addSortOptionToCriteria(getCriteria(searchArgs, language), searchArgs.get('sortOption'), language)
      .set('limit', limit)
      .set('skip', skip),
    sessionToken,
  );

export const getOrderStates = async (searchArgs, sessionToken, language) => {
  const count = await getOrderStatesCountMatchCriteria(searchArgs, sessionToken, language);
  const {
    limit, skip, hasNextPage, hasPreviousPage,
  } = RelayHelper.getLimitAndSkipValue(searchArgs, count, 10, 1000);
  const orderStates = await getOrderStatesMatchCriteria(searchArgs, sessionToken, language, limit, skip);
  const indexedOrderStates = orderStates.zip(Range(skip, skip + limit));

  const edges = indexedOrderStates.map(indexedItem => ({
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
  name: 'OrderStateType',
  nodeType: OrderState,
});
