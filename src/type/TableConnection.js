// @flow

import { ImmutableEx, RelayHelper, StringHelper } from '@microbusiness/common-javascript';
import { TableService } from '@fingermenu/parse-server-common';
import { Map } from 'immutable';
import { connectionDefinitions } from 'graphql-relay';
import Table from './Table';
import Common from './Common';

const getCriteria = (searchArgs, ownedByUserId, language) =>
  ImmutableEx.removeUndefinedProps(
    Map({
      language,
      ids: searchArgs.has('tableIds') ? searchArgs.get('tableIds') : undefined,
      conditions: Map({
        ownedByUserId,
        contains_names: StringHelper.convertStringArgumentToSet(searchArgs.get('name')),
        contains_customerNames: StringHelper.convertStringArgumentToSet(searchArgs.get('customerName')),
        contains_notess: StringHelper.convertStringArgumentToSet(searchArgs.get('notes')),
        restaurantId: searchArgs.has('restaurantId') ? searchArgs.get('restaurantId') : undefined,
        tableStateId: searchArgs.has('tableStateId') ? searchArgs.get('tableStateId') : undefined,
        lastOrderCorrelationId: searchArgs.has('lastOrderCorrelationId') ? searchArgs.get('lastOrderCorrelationId') : undefined,
      }),
    }),
  );

const addSortOptionToCriteria = (criteria, sortOption, language) => {
  if (sortOption && sortOption.localeCompare('SortOrderIndexDescending') === 0) {
    return criteria.set('orderByFieldDescending', 'sortOrderIndex');
  }

  if (sortOption && sortOption.localeCompare('SortOrderIndexAscending') === 0) {
    return criteria.set('orderByFieldAscending', 'sortOrderIndex');
  }

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

  return criteria.set('orderByFieldAscending', 'sortOrderIndex');
};

const getTablesCountMatchCriteria = async (searchArgs, ownedByUserId, sessionToken, language) =>
  new TableService().count(
    addSortOptionToCriteria(getCriteria(searchArgs, ownedByUserId, language), searchArgs.get('sortOption'), language),
    sessionToken,
  );

const getTablesMatchCriteria = async (searchArgs, ownedByUserId, sessionToken, language, limit, skip) =>
  new TableService().search(
    addSortOptionToCriteria(getCriteria(searchArgs, ownedByUserId, language), searchArgs.get('sortOption'), language).merge(Map({ limit, skip })),
    sessionToken,
  );

export const getTables = async (searchArgs, { userLoaderBySessionToken, tableStateLoaderByKey }, sessionToken, language) => {
  const userId = (await userLoaderBySessionToken.load(sessionToken)).id;
  const tableStateId = searchArgs.get('tableState') ? await tableStateLoaderByKey(searchArgs.get('tableState')) : null;
  const finalSearchArgs = searchArgs.merge(tableStateId ? Map({ tableStateId }) : Map());
  const count = await getTablesCountMatchCriteria(finalSearchArgs, userId, sessionToken, language);

  if (count === 0) {
    return Common.getEmptyResult();
  }

  const { limit, skip, hasNextPage, hasPreviousPage } = RelayHelper.getLimitAndSkipValue(finalSearchArgs, count, 10, 1000);
  const results = await getTablesMatchCriteria(finalSearchArgs, userId, sessionToken, language, limit, skip);

  return Common.convertResultsToRelayConnectionResponse(results, skip, limit, count, hasNextPage, hasPreviousPage);
};

export default connectionDefinitions({
  name: 'TableType',
  nodeType: Table,
});
