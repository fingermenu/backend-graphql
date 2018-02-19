// @flow

import { ImmutableEx, RelayHelper, StringHelper } from '@microbusiness/common-javascript';
import { SizeService } from '@fingermenu/parse-server-common';
import { Map } from 'immutable';
import { connectionDefinitions } from 'graphql-relay';
import Size from './Size';
import Common from './Common';

const getCriteria = (searchArgs, ownedByUserId, language) =>
  ImmutableEx.removeUndefinedProps(
    Map({
      language,
      ids: searchArgs.has('sizeIds') ? searchArgs.get('sizeIds') : undefined,
      conditions: Map({
        ownedByUserId,
        contains_names: StringHelper.convertStringArgumentToSet(searchArgs.get('name')),
      }),
    }),
  );

const addSortOptionToCriteria = (criteria, sortOption, language) => {
  if (sortOption && sortOption.localeCompare('NameDescending') === 0) {
    return criteria.set('orderByFieldDescending', `${language}_name`);
  }

  if (sortOption && sortOption.localeCompare('NameAscending') === 0) {
    return criteria.set('orderByFieldAscending', `${language}_name`);
  }

  return criteria.set('orderByFieldAscending', `${language}_name`);
};

const getSizesCountMatchCriteria = async (searchArgs, ownedByUserId, sessionToken, language) =>
  new SizeService().count(
    addSortOptionToCriteria(getCriteria(searchArgs, ownedByUserId, language), searchArgs.get('sortOption'), language),
    sessionToken,
  );

const getSizesMatchCriteria = async (searchArgs, ownedByUserId, sessionToken, language, limit, skip) =>
  new SizeService().search(
    addSortOptionToCriteria(getCriteria(searchArgs, ownedByUserId, language), searchArgs.get('sortOption'), language)
      .set('limit', limit)
      .set('skip', skip),
    sessionToken,
  );

export const getSizes = async (searchArgs, { userLoaderBySessionToken }, sessionToken, language) => {
  const userId = (await userLoaderBySessionToken.load(sessionToken)).id;
  const count = await getSizesCountMatchCriteria(searchArgs, userId, sessionToken, language);

  if (count === 0) {
    return Common.getEmptyResult();
  }

  const { limit, skip, hasNextPage, hasPreviousPage } = RelayHelper.getLimitAndSkipValue(searchArgs, count, 10, 1000);
  const results = await getSizesMatchCriteria(searchArgs, userId, sessionToken, language, limit, skip);

  return Common.convertResultsToRelayConnectionResponse(results, skip, limit, count, hasNextPage, hasPreviousPage);
};

export default connectionDefinitions({
  name: 'SizeType',
  nodeType: Size,
});
