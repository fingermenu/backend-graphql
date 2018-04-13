// @flow

import { ImmutableEx, RelayHelper } from '@microbusiness/common-javascript';
import { DietaryOptionService } from '@fingermenu/parse-server-common';
import { Map } from 'immutable';
import { connectionDefinitions } from 'graphql-relay';
import DietaryOption from './DietaryOption';
import Common from './Common';

const getCriteria = (searchArgs, ownedByUserId) =>
  ImmutableEx.removeUndefinedProps(
    Map({
      ids: searchArgs.has('dietaryOptionIds') ? searchArgs.get('dietaryOptionIds') : undefined,
      conditions: Map({
        ownedByUserId,
      }),
    }),
  );

const addSortOptionToCriteria = criteria => {
  return criteria;
};

const getDietaryOptionsCountMatchCriteria = async (searchArgs, ownedByUserId, sessionToken) =>
  new DietaryOptionService().count(addSortOptionToCriteria(getCriteria(searchArgs, ownedByUserId), searchArgs.get('sortOption')), sessionToken);

const getDietaryOptionsMatchCriteria = async (searchArgs, ownedByUserId, sessionToken, limit, skip) =>
  new DietaryOptionService().search(
    addSortOptionToCriteria(getCriteria(searchArgs, ownedByUserId), searchArgs.get('sortOption'))
      .set('limit', limit)
      .set('skip', skip),
    sessionToken,
  );

export const getDietaryOptions = async (searchArgs, { userLoaderBySessionToken }, sessionToken) => {
  const userId = (await userLoaderBySessionToken.load(sessionToken)).id;
  const count = await getDietaryOptionsCountMatchCriteria(searchArgs, userId, sessionToken);

  if (count === 0) {
    return Common.getEmptyResult();
  }

  const { limit, skip, hasNextPage, hasPreviousPage } = RelayHelper.getLimitAndSkipValue(searchArgs, count, 10, 1000);
  const results = await getDietaryOptionsMatchCriteria(searchArgs, userId, sessionToken, limit, skip);

  return Common.convertResultsToRelayConnectionResponse(results, skip, limit, count, hasNextPage, hasPreviousPage);
};

export default connectionDefinitions({
  name: 'DietaryOptionType',
  nodeType: DietaryOption,
});
