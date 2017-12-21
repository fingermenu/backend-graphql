// @flow

import { Map, Range } from 'immutable';
import { connectionDefinitions } from 'graphql-relay';
import { RelayHelper, StringHelper } from 'micro-business-common-javascript';
import { ChoiceItemService } from 'finger-menu-parse-server-common';
import ChoiceItem from './ChoiceItem';

const getCriteria = (searchArgs, ownedByUserId) =>
  Map({
    include_parentChoiceItem: true,
    ids: searchArgs.has('choiceItemIds') ? searchArgs.get('choiceItemIds') : undefined,
    conditions: Map({
      ownedByUserId,
      contains_names: StringHelper.convertStringArgumentToSet(searchArgs.get('name')),
      contains_descriptions: StringHelper.convertStringArgumentToSet(searchArgs.get('description')),
    }),
  });

const addSortOptionToCriteria = (criteria, sortOption) => {
  if (sortOption && sortOption.localeCompare('NameDescending') === 0) {
    return criteria.set('orderByFieldDescending', 'name');
  }

  if (sortOption && sortOption.localeCompare('NameAscending') === 0) {
    return criteria.set('orderByFieldAscending', 'name');
  }

  if (sortOption && sortOption.localeCompare('DescriptionDescending') === 0) {
    return criteria.set('orderByFieldDescending', 'description');
  }

  if (sortOption && sortOption.localeCompare('DescriptionAscending') === 0) {
    return criteria.set('orderByFieldAscending', 'description');
  }

  return criteria.set('orderByFieldAscending', 'name');
};

const getChoiceItemsCountMatchCriteria = async (searchArgs, ownedByUserId, sessionToken) =>
  new ChoiceItemService().count(addSortOptionToCriteria(getCriteria(searchArgs, ownedByUserId), searchArgs.get('sortOption')), sessionToken);

const getChoiceItemsMatchCriteria = async (searchArgs, ownedByUserId, sessionToken, limit, skip) =>
  new ChoiceItemService().search(
    addSortOptionToCriteria(getCriteria(searchArgs, ownedByUserId), searchArgs.get('sortOption'))
      .set('limit', limit)
      .set('skip', skip),
    sessionToken,
  );

export const getChoiceItems = async (searchArgs, dataLoaders, sessionToken) => {
  const userId = (await dataLoaders.userLoaderBySessionToken.load(sessionToken)).id;
  const count = await getChoiceItemsCountMatchCriteria(searchArgs, userId, sessionToken);
  const {
    limit, skip, hasNextPage, hasPreviousPage,
  } = RelayHelper.getLimitAndSkipValue(searchArgs, count, 10, 1000);
  const choiceItems = await getChoiceItemsMatchCriteria(searchArgs, userId, sessionToken, limit, skip);
  const indexedChoiceItems = choiceItems.zip(Range(skip, skip + limit));

  const edges = indexedChoiceItems.map(indexedItem => ({
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
  name: 'ChoiceItemType',
  nodeType: ChoiceItem,
});