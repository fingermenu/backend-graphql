// @flow

import { ImmutableEx, RelayHelper } from '@microbusiness/common-javascript';
import { DishTypeService } from '@fingermenu/parse-server-common';
import { Map } from 'immutable';
import { connectionDefinitions } from 'graphql-relay';
import DishType from './DishType';
import Common from './Common';

const getCriteria = (searchArgs, ownedByUserId) =>
  ImmutableEx.removeUndefinedProps(
    Map({
      ids: searchArgs.has('dishTypeIds') ? searchArgs.get('dishTypeIds') : undefined,
      conditions: Map({
        ownedByUserId,
      }),
    }),
  );

const addSortOptionToCriteria = criteria => {
  return criteria;
};

const getDishTypesCountMatchCriteria = async (searchArgs, ownedByUserId, sessionToken) =>
  new DishTypeService().count(addSortOptionToCriteria(getCriteria(searchArgs, ownedByUserId), searchArgs.get('sortOption')), sessionToken);

const getDishTypesMatchCriteria = async (searchArgs, ownedByUserId, sessionToken, limit, skip) =>
  new DishTypeService().search(
    addSortOptionToCriteria(getCriteria(searchArgs, ownedByUserId), searchArgs.get('sortOption'))
      .set('limit', limit)
      .set('skip', skip),
    sessionToken,
  );

export const getDishTypes = async (searchArgs, { userLoaderBySessionToken }, sessionToken) => {
  const userId = (await userLoaderBySessionToken.load(sessionToken)).id;
  const count = await getDishTypesCountMatchCriteria(searchArgs, userId, sessionToken);

  if (count === 0) {
    return Common.getEmptyResult();
  }

  const { limit, skip, hasNextPage, hasPreviousPage } = RelayHelper.getLimitAndSkipValue(searchArgs, count, 10, 1000);
  const results = await getDishTypesMatchCriteria(searchArgs, userId, sessionToken, limit, skip);

  return Common.convertResultsToRelayConnectionResponse(results, skip, limit, count, hasNextPage, hasPreviousPage);
};

export default connectionDefinitions({
  name: 'DishTypeType',
  nodeType: DishType,
});
