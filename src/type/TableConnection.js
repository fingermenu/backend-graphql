// @flow

import { Map, Range } from 'immutable';
import { connectionDefinitions } from 'graphql-relay';
import { RelayHelper, StringHelper } from '@microbusiness/common-javascript';
import { TableService } from '@fingermenu/parse-server-common';
import Table from './Table';

const getCriteria = (searchArgs, ownedByUserId, language) =>
  Map({
    language,
    ids: searchArgs.has('tableIds') ? searchArgs.get('tableIds') : undefined,
    conditions: Map({
      ownedByUserId,
      contains_names: StringHelper.convertStringArgumentToSet(searchArgs.get('name')),
      contains_customerNames: StringHelper.convertStringArgumentToSet(searchArgs.get('customerName')),
      contains_notess: StringHelper.convertStringArgumentToSet(searchArgs.get('notes')),
    }),
  })
    .merge(searchArgs.has('restaurantId') ? Map({ conditions: Map({ restaurantId: searchArgs.get('restaurantId') }) }) : Map())
    .merge(searchArgs.has('tableStateId') ? Map({ conditions: Map({ tableStateId: searchArgs.get('tableStateId') }) }) : Map());

const addSortOptionToCriteria = (criteria, sortOption, language) => {
  if (sortOption && sortOption.localeCompare('NameDescending') === 0) {
    return criteria.set('orderByFieldDescending', `${language}_name`);
  }

  if (sortOption && sortOption.localeCompare('NameAscending') === 0) {
    return criteria.set('orderByFieldAscending', `${language}_name`);
  }

  if (sortOption && sortOption.localeCompare('NumberOfAdultsDescending') === 0) {
    return criteria.set('orderByFieldDescending', 'numberOfAdults');
  }

  if (sortOption && sortOption.localeCompare('NumberOfAdultsAscending') === 0) {
    return criteria.set('orderByFieldAscending', 'numberOfAdults');
  }

  if (sortOption && sortOption.localeCompare('NumberOfChildrenDescending') === 0) {
    return criteria.set('orderByFieldDescending', 'numberOfChildren');
  }

  if (sortOption && sortOption.localeCompare('NumberOfChildrenAscending') === 0) {
    return criteria.set('orderByFieldAscending', 'numberOfChildren');
  }

  if (sortOption && sortOption.localeCompare('NotesDescending') === 0) {
    return criteria.set('orderByFieldDescending', 'notes');
  }

  if (sortOption && sortOption.localeCompare('NotesAscending') === 0) {
    return criteria.set('orderByFieldAscending', 'notes');
  }

  if (sortOption && sortOption.localeCompare('CustomerNameDescending') === 0) {
    return criteria.set('orderByFieldDescending', 'customerName');
  }

  if (sortOption && sortOption.localeCompare('CustomerNameAscending') === 0) {
    return criteria.set('orderByFieldAscending', 'customerName');
  }

  return criteria.set('orderByFieldAscending', `${language}_name`);
};

const getTablesCountMatchCriteria = async (searchArgs, ownedByUserId, sessionToken, language) =>
  new TableService().count(
    addSortOptionToCriteria(getCriteria(searchArgs, ownedByUserId, language), searchArgs.get('sortOption'), language),
    sessionToken,
  );

const getTablesMatchCriteria = async (searchArgs, ownedByUserId, sessionToken, language, limit, skip) =>
  new TableService().search(
    addSortOptionToCriteria(getCriteria(searchArgs, ownedByUserId, language), searchArgs.get('sortOption'), language)
      .set('limit', limit)
      .set('skip', skip),
    sessionToken,
  );

export const getTables = async (searchArgs, dataLoaders, sessionToken, language) => {
  const userId = (await dataLoaders.userLoaderBySessionToken.load(sessionToken)).id;
  const tableStateId = searchArgs.get('tableState') ? await dataLoaders.tableStateLoaderByKey(searchArgs.get('tableState')) : null;
  const finalSearchArgs = searchArgs.merge(tableStateId ? Map({ tableStateId }) : Map());
  const count = await getTablesCountMatchCriteria(finalSearchArgs, userId, sessionToken, language);
  const {
    limit, skip, hasNextPage, hasPreviousPage,
  } = RelayHelper.getLimitAndSkipValue(finalSearchArgs, count, 10, 1000);
  const tables = await getTablesMatchCriteria(finalSearchArgs, userId, sessionToken, language, limit, skip);
  const indexedTables = tables.zip(Range(skip, skip + limit));

  const edges = indexedTables.map(indexedItem => ({
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
  name: 'TableType',
  nodeType: Table,
});
