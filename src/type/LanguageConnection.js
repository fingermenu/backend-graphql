// @flow

import { Map, Range } from 'immutable';
import { connectionDefinitions } from 'graphql-relay';
import { RelayHelper, StringHelper } from '@microbusiness/common-javascript';
import { LanguageService } from '@fingermenu/parse-server-common';
import Language from './Language';

const getCriteria = searchArgs =>
  Map({
    ids: searchArgs.has('languageIds') ? searchArgs.get('languageIds') : undefined,
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

const addSortOptionToCriteria = (criteria, sortOption) => {
  if (sortOption && sortOption.localeCompare('NameDescending') === 0) {
    return criteria.set('orderByFieldDescending', 'name');
  }

  if (sortOption && sortOption.localeCompare('NameAscending') === 0) {
    return criteria.set('orderByFieldAscending', 'name');
  }

  return criteria.set('orderByFieldAscending', 'name');
};

const getLanguagesCountMatchCriteria = async (searchArgs, sessionToken) =>
  new LanguageService().count(addSortOptionToCriteria(getCriteria(searchArgs), searchArgs.get('sortOption')), sessionToken);

const getLanguagesMatchCriteria = async (searchArgs, sessionToken, limit, skip) =>
  new LanguageService().search(
    addSortOptionToCriteria(getCriteria(searchArgs), searchArgs.get('sortOption'))
      .set('limit', limit)
      .set('skip', skip),
    sessionToken,
  );

export const getLanguages = async (searchArgs, sessionToken) => {
  const count = await getLanguagesCountMatchCriteria(searchArgs, sessionToken);
  const {
    limit, skip, hasNextPage, hasPreviousPage,
  } = RelayHelper.getLimitAndSkipValue(searchArgs, count, 10, 1000);
  const languages = await getLanguagesMatchCriteria(searchArgs, sessionToken, limit, skip);
  const indexedLanguages = languages.zip(Range(skip, skip + limit));

  const edges = indexedLanguages.map(indexedItem => ({
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
  name: 'LanguageType',
  nodeType: Language,
});
