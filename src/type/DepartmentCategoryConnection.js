// @flow

import { ImmutableEx, RelayHelper } from '@microbusiness/common-javascript';
import { DepartmentCategoryService } from '@fingermenu/parse-server-common';
import { Map } from 'immutable';
import { connectionDefinitions } from 'graphql-relay';
import DepartmentCategory from './DepartmentCategory';
import Common from './Common';

const getCriteria = (searchArgs, ownedByUserId) =>
  ImmutableEx.removeUndefinedProps(
    Map({
      ids: searchArgs.has('departmentCategoryIds') ? searchArgs.get('departmentCategoryIds') : undefined,
      conditions: Map({
        ownedByUserId,
      }),
    }),
  );

const addSortOptionToCriteria = criteria => {
  return criteria;
};

const getDepartmentCategorysCountMatchCriteria = async (searchArgs, ownedByUserId, sessionToken) =>
  new DepartmentCategoryService().count(addSortOptionToCriteria(getCriteria(searchArgs, ownedByUserId), searchArgs.get('sortOption')), sessionToken);

const getDepartmentCategorysMatchCriteria = async (searchArgs, ownedByUserId, sessionToken, limit, skip) =>
  new DepartmentCategoryService().search(
    addSortOptionToCriteria(getCriteria(searchArgs, ownedByUserId), searchArgs.get('sortOption')).merge(Map({ limit, skip })),
    sessionToken,
  );

export const getDepartmentCategorys = async (searchArgs, { userLoaderBySessionToken }, sessionToken) => {
  const userId = (await userLoaderBySessionToken.load(sessionToken)).id;
  const count = await getDepartmentCategorysCountMatchCriteria(searchArgs, userId, sessionToken);

  if (count === 0) {
    return Common.getEmptyResult();
  }

  const { limit, skip, hasNextPage, hasPreviousPage } = RelayHelper.getLimitAndSkipValue(searchArgs, count, 10, 1000);
  const results = await getDepartmentCategorysMatchCriteria(searchArgs, userId, sessionToken, limit, skip);

  return Common.convertResultsToRelayConnectionResponse(results, skip, limit, count, hasNextPage, hasPreviousPage);
};

export default connectionDefinitions({
  name: 'DepartmentCategoryType',
  nodeType: DepartmentCategory,
});
