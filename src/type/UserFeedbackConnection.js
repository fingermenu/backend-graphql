// @flow

import { ImmutableEx, RelayHelper, StringHelper } from '@microbusiness/common-javascript';
import { UserFeedbackService } from '@fingermenu/parse-server-common';
import { convert, ZonedDateTime } from 'js-joda';
import { Map } from 'immutable';
import { connectionDefinitions } from 'graphql-relay';
import UserFeedback from './UserFeedback';
import Common from './Common';

const getCriteria = (searchArgs, ownedByUserId) => {
  let dateRange;

  if (searchArgs.has('dateRange')) {
    dateRange = {
      from: convert(ZonedDateTime.parse(searchArgs.getIn(['dateRange', 'from']))).toDate(),
      to: convert(ZonedDateTime.parse(searchArgs.getIn(['dateRange', 'to']))).toDate(),
    };

    if (dateRange.to < dateRange.from) {
      throw new Error('dateRange is invalid. \'to\' is less than \'from\'.');
    }
  }

  return ImmutableEx.removeUndefinedProps(
    Map({
      ids: searchArgs.has('userFeedbackIds') ? searchArgs.get('userFeedbackIds') : undefined,
      conditions: Map({
        contains_others: StringHelper.convertStringArgumentToSet(searchArgs.get('others')),
        greaterThanOrEqualTo_submittedAt: dateRange ? dateRange.from : undefined,
        lessThanOrEqualTo_submittedAt: dateRange ? dateRange.to : undefined,
        ownedByUserId,
      }),
    }),
  );
};

const addSortOptionToCriteria = (criteria, sortOption) => {
  if (sortOption && sortOption.localeCompare('PlacedAtDescending') === 0) {
    return criteria.set('orderByFieldDescending', 'submittedAt');
  }

  if (sortOption && sortOption.localeCompare('PlacedAtAscending') === 0) {
    return criteria.set('orderByFieldAscending', 'submittedAt');
  }

  if (sortOption && sortOption.localeCompare('OthersDescending') === 0) {
    return criteria.set('orderByFieldDescending', 'others');
  }

  if (sortOption && sortOption.localeCompare('OthersAscending') === 0) {
    return criteria.set('orderByFieldAscending', 'others');
  }

  return criteria.set('PlacedAtDescending', 'submittedAt');
};

const getUserFeedbacksCountMatchCriteria = async (searchArgs, ownedByUserId, sessionToken) =>
  new UserFeedbackService().count(addSortOptionToCriteria(getCriteria(searchArgs, ownedByUserId), searchArgs.get('sortOption')), sessionToken);

const getUserFeedbacksMatchCriteria = async (searchArgs, ownedByUserId, sessionToken, limit, skip) =>
  new UserFeedbackService().search(
    addSortOptionToCriteria(getCriteria(searchArgs, ownedByUserId), searchArgs.get('sortOption')).merge(Map({ limit, skip })),
    sessionToken,
  );

export const getUserFeedbacks = async (searchArgs, { userLoaderBySessionToken }, sessionToken) => {
  const userId = (await userLoaderBySessionToken.load(sessionToken)).id;
  const count = await getUserFeedbacksCountMatchCriteria(searchArgs, userId, sessionToken);

  if (count === 0) {
    return Common.getEmptyResult();
  }

  const { limit, skip, hasNextPage, hasPreviousPage } = RelayHelper.getLimitAndSkipValue(searchArgs, count, 10, 1000);
  const results = await getUserFeedbacksMatchCriteria(searchArgs, userId, sessionToken, limit, skip);

  return Common.convertResultsToRelayConnectionResponse(results, skip, limit, count, hasNextPage, hasPreviousPage);
};

export default connectionDefinitions({
  name: 'UserFeedbackType',
  nodeType: UserFeedback,
});
