// @flow

import { ImmutableEx, RelayHelper, StringHelper } from '@microbusiness/common-javascript';
import { TableStateService } from '@fingermenu/parse-server-common';
import { Map, Range } from 'immutable';
import { connectionDefinitions } from 'graphql-relay';
import TableState from './TableState';

const getCriteria = (searchArgs, language) =>
  ImmutableEx.removeUndefinedProps(Map({
    language,
    ids: searchArgs.has('tableStateIds') ? searchArgs.get('tableStateIds') : undefined,
    conditions: Map({
      contains_names: StringHelper.convertStringArgumentToSet(searchArgs.get('name')),
      key: searchArgs.has('key')
        ? searchArgs
          .get('key')
          .trim()
          .toLowerCase()
        : undefined,
    }),
  }));

const addSortOptionToCriteria = (criteria, sortOption, language) => {
  if (sortOption && sortOption.localeCompare('NameDescending') === 0) {
    return criteria.set('orderByFieldDescending', `${language}_name`);
  }

  if (sortOption && sortOption.localeCompare('NameAscending') === 0) {
    return criteria.set('orderByFieldAscending', `${language}_name`);
  }

  return criteria.set('orderByFieldAscending', `${language}_name`);
};

const getTableStatesCountMatchCriteria = async (searchArgs, sessionToken, language) =>
  new TableStateService().count(addSortOptionToCriteria(getCriteria(searchArgs, language), searchArgs.get('sortOption'), language), sessionToken);

const getTableStatesMatchCriteria = async (searchArgs, sessionToken, language, limit, skip) =>
  new TableStateService().search(
    addSortOptionToCriteria(getCriteria(searchArgs, language), searchArgs.get('sortOption'), language)
      .set('limit', limit)
      .set('skip', skip),
    sessionToken,
  );

export const getTableStates = async (searchArgs, sessionToken, language) => {
  const count = await getTableStatesCountMatchCriteria(searchArgs, sessionToken, language);
  const {
    limit, skip, hasNextPage, hasPreviousPage,
  } = RelayHelper.getLimitAndSkipValue(searchArgs, count, 10, 1000);
  const tableStates = await getTableStatesMatchCriteria(searchArgs, sessionToken, language, limit, skip);
  const indexedTableStates = tableStates.zip(Range(skip, skip + limit));

  const edges = indexedTableStates.map(indexedItem => ({
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
  name: 'TableStateType',
  nodeType: TableState,
});
