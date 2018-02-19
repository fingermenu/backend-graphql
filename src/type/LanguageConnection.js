// @flow

import { ImmutableEx, RelayHelper, StringHelper } from '@microbusiness/common-javascript';
import { LanguageService } from '@fingermenu/parse-server-common';
import { Map } from 'immutable';
import { connectionDefinitions } from 'graphql-relay';
import Language from './Language';
import Common from './Common';

const getCriteria = searchArgs =>
  ImmutableEx.removeUndefinedProps(
    Map({
      ids: searchArgs.has('languageIds') ? searchArgs.get('languageIds') : undefined,
      conditions: Map({
        contains_names: StringHelper.convertStringArgumentToSet(searchArgs.get('name')),
        key: searchArgs.has('key')
          ? searchArgs
            .get('key')
            .trim()
            .toLowerCase()
          : undefined,
      }),
    }),
  );

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

  if (count === 0) {
    return Common.getEmptyResult();
  }

  const { limit, skip, hasNextPage, hasPreviousPage } = RelayHelper.getLimitAndSkipValue(searchArgs, count, 10, 1000);
  const results = await getLanguagesMatchCriteria(searchArgs, sessionToken, limit, skip);

  return Common.convertResultsToRelayConnectionResponse(results, skip, limit, count, hasNextPage, hasPreviousPage);
};

export default connectionDefinitions({
  name: 'LanguageType',
  nodeType: Language,
});
