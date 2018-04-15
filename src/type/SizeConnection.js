// @flow

import { ImmutableEx, RelayHelper } from '@microbusiness/common-javascript';
import { SizeService } from '@fingermenu/parse-server-common';
import { Map } from 'immutable';
import { connectionDefinitions } from 'graphql-relay';
import Size from './Size';
import Common from './Common';

const getCriteria = (searchArgs, ownedByUserId) =>
  ImmutableEx.removeUndefinedProps(
    Map({
      ids: searchArgs.has('sizeIds') ? searchArgs.get('sizeIds') : undefined,
      conditions: Map({
        ownedByUserId,
      }),
    }),
  );

const addSortOptionToCriteria = criteria => {
  return criteria;
};

const getSizesCountMatchCriteria = async (searchArgs, ownedByUserId, sessionToken) =>
  new SizeService().count(addSortOptionToCriteria(getCriteria(searchArgs, ownedByUserId), searchArgs.get('sortOption')), sessionToken);

const getSizesMatchCriteria = async (searchArgs, ownedByUserId, sessionToken, limit, skip) =>
  new SizeService().search(
    addSortOptionToCriteria(getCriteria(searchArgs, ownedByUserId), searchArgs.get('sortOption'))
      .set('limit', limit)
      .set('skip', skip),
    sessionToken,
  );

export const getSizes = async (searchArgs, { userLoaderBySessionToken }, sessionToken) => {
  const userId = (await userLoaderBySessionToken.load(sessionToken)).id;
  const count = await getSizesCountMatchCriteria(searchArgs, userId, sessionToken);

  if (count === 0) {
    return Common.getEmptyResult();
  }

  const { limit, skip, hasNextPage, hasPreviousPage } = RelayHelper.getLimitAndSkipValue(searchArgs, count, 10, 1000);
  const results = await getSizesMatchCriteria(searchArgs, userId, sessionToken, limit, skip);

  return Common.convertResultsToRelayConnectionResponse(results, skip, limit, count, hasNextPage, hasPreviousPage);
};

export default connectionDefinitions({
  name: 'SizeType',
  nodeType: Size,
});
