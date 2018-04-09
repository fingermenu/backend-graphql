// @flow

import { ImmutableEx, RelayHelper } from '@microbusiness/common-javascript';
import { ServingTimeService } from '@fingermenu/parse-server-common';
import { Map } from 'immutable';
import { connectionDefinitions } from 'graphql-relay';
import ServingTime from './ServingTime';
import Common from './Common';

const getCriteria = (searchArgs, ownedByUserId) =>
  ImmutableEx.removeUndefinedProps(
    Map({
      ids: searchArgs.has('servingTimeIds') ? searchArgs.get('servingTimeIds') : undefined,
      conditions: Map({
        ownedByUserId,
      }),
    }),
  );

const addSortOptionToCriteria = criteria => {
  return criteria;
};

const getServingTimesCountMatchCriteria = async (searchArgs, ownedByUserId, sessionToken) =>
  new ServingTimeService().count(addSortOptionToCriteria(getCriteria(searchArgs, ownedByUserId), searchArgs.get('sortOption')), sessionToken);

const getServingTimesMatchCriteria = async (searchArgs, ownedByUserId, sessionToken, limit, skip) =>
  new ServingTimeService().search(
    addSortOptionToCriteria(getCriteria(searchArgs, ownedByUserId), searchArgs.get('sortOption'))
      .set('limit', limit)
      .set('skip', skip),
    sessionToken,
  );

export const getServingTimes = async (searchArgs, { userLoaderBySessionToken }, sessionToken) => {
  const userId = (await userLoaderBySessionToken.load(sessionToken)).id;
  const count = await getServingTimesCountMatchCriteria(searchArgs, userId, sessionToken);

  if (count === 0) {
    return Common.getEmptyResult();
  }

  const { limit, skip, hasNextPage, hasPreviousPage } = RelayHelper.getLimitAndSkipValue(searchArgs, count, 10, 1000);
  const results = await getServingTimesMatchCriteria(searchArgs, userId, sessionToken, limit, skip);

  return Common.convertResultsToRelayConnectionResponse(results, skip, limit, count, hasNextPage, hasPreviousPage);
};

export default connectionDefinitions({
  name: 'ServingTimeType',
  nodeType: ServingTime,
});
