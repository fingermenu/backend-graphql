// @flow

import { ImmutableEx, RelayHelper, StringHelper } from '@microbusiness/common-javascript';
import { ChoiceItemService } from '@fingermenu/parse-server-common';
import { Map, Range } from 'immutable';
import { connectionDefinitions } from 'graphql-relay';
import ChoiceItem from './ChoiceItem';

const getCriteria = (searchArgs, addedByUserId, language) =>
  ImmutableEx.removeUndefinedProps(Map({
    language,
    ids: searchArgs.has('choiceItemIds') ? searchArgs.get('choiceItemIds') : undefined,
    conditions: Map({
      addedByUserId,
      doesNotExist_removedByUser: true,
      contains_names: StringHelper.convertStringArgumentToSet(searchArgs.get('name')),
      contains_descriptions: StringHelper.convertStringArgumentToSet(searchArgs.get('description')),
    }),
  }));

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

const getChoiceItemsCountMatchCriteria = async (searchArgs, addedByUserId, sessionToken, language) =>
  new ChoiceItemService().count(
    addSortOptionToCriteria(getCriteria(searchArgs, addedByUserId, language), searchArgs.get('sortOption'), language),
    sessionToken,
  );

const getChoiceItemsMatchCriteria = async (searchArgs, addedByUserId, sessionToken, language, limit, skip) =>
  new ChoiceItemService().search(
    addSortOptionToCriteria(getCriteria(searchArgs, addedByUserId, language), searchArgs.get('sortOption'), language)
      .set('limit', limit)
      .set('skip', skip),
    sessionToken,
  );

export const getChoiceItems = async (searchArgs, { userLoaderBySessionToken }, sessionToken, language) => {
  const userId = (await userLoaderBySessionToken.load(sessionToken)).id;
  const count = await getChoiceItemsCountMatchCriteria(searchArgs, userId, sessionToken, language);
  const {
    limit, skip, hasNextPage, hasPreviousPage,
  } = RelayHelper.getLimitAndSkipValue(searchArgs, count, 10, 1000);
  const choiceItems = await getChoiceItemsMatchCriteria(searchArgs, userId, sessionToken, language, limit, skip);
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
