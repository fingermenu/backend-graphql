// @flow

import { ImmutableEx, RelayHelper, StringHelper } from '@microbusiness/common-javascript';
import { OrderService } from '@fingermenu/parse-server-common';
import { convert, ZonedDateTime } from 'js-joda';
import { Map } from 'immutable';
import { connectionDefinitions } from 'graphql-relay';
import Order from './Order';
import Common from './Common';

const getCriteria = searchArgs => {
  let dateRange;

  if (searchArgs.has('dateRange')) {
    dateRange = {
      from: convert(ZonedDateTime.parse(searchArgs.getIn(['dateRange', 'from']))).toDate(),
      to: convert(ZonedDateTime.parse(searchArgs.getIn(['dateRange', 'to']))).toDate(),
    };

    if (dateRange.to < dateRange.from) {
      throw new Error('dateRange is invalid. \'to\' is less than \'from\'.');
    }

    if (dateRange.to - dateRange.from > 1000 * 60 * 60 * 24) {
      throw new Error('dateRange is invalid. dateRange convers period longer than a day.');
    }
  }

  const criteria = Map({
    ids: searchArgs.has('orderIds') ? searchArgs.get('orderIds') : undefined,
    conditions: Map({
      corelationId: searchArgs.has('corelationId') ? searchArgs.get('corelationId') : undefined,
      contains_names: StringHelper.convertStringArgumentToSet(searchArgs.get('name')),
      contains_customerNames: StringHelper.convertStringArgumentToSet(searchArgs.get('customerName')),
      contains_notess: StringHelper.convertStringArgumentToSet(searchArgs.get('notes')),
      exist_cancelledAt: searchArgs.has('includeCancelledOrders') && searchArgs.get('includeCancelledOrders') ? true : undefined,
      deosNotExist_cancelledAt: !searchArgs.has('includeCancelledOrders') || !searchArgs.get('includeCancelledOrders') ? true : undefined,
      restaurantId: searchArgs.has('restaurantId') ? searchArgs.get('restaurantId') : undefined,
      tableId: searchArgs.has('tableId') ? searchArgs.get('tableId') : undefined,
      greaterThanOrEqualTo_placedAt: dateRange ? dateRange.from : undefined,
      lessThanOrEqualTo_placedAt: dateRange ? dateRange.to : undefined,
    }),
  });

  return ImmutableEx.removeUndefinedProps(criteria);
};

const addSortOptionToCriteria = (criteria, sortOption) => {
  if (sortOption && sortOption.localeCompare('PlacedAtDescending') === 0) {
    return criteria.set('orderByFieldDescending', 'placedAt');
  }

  if (sortOption && sortOption.localeCompare('PlacedAtAscending') === 0) {
    return criteria.set('orderByFieldAscending', 'placedAt');
  }

  if (sortOption && sortOption.localeCompare('TotalPriceDescending') === 0) {
    return criteria.set('orderByFieldDescending', 'totalPrice');
  }

  if (sortOption && sortOption.localeCompare('TotalPriceAscending') === 0) {
    return criteria.set('orderByFieldAscending', 'totalPrice');
  }

  if (sortOption && sortOption.localeCompare('NotesDescending') === 0) {
    return criteria.set('orderByFieldDescending', 'notes');
  }

  if (sortOption && sortOption.localeCompare('NotesAscending') === 0) {
    return criteria.set('orderByFieldAscending', 'notes');
  }

  if (sortOption && sortOption.localeCompare('CustomerNameDescending') === 0) {
    return criteria.set('orderByFieldDescending', 'customerName');
  }

  if (sortOption && sortOption.localeCompare('CustomerNameAscending') === 0) {
    return criteria.set('orderByFieldAscending', 'customerName');
  }

  return criteria.set('PlacedAtDescending', 'placedAt');
};

const getOrdersCountMatchCriteria = async (searchArgs, sessionToken) =>
  new OrderService().count(addSortOptionToCriteria(getCriteria(searchArgs), searchArgs.get('sortOption')), sessionToken);

const getOrdersMatchCriteria = async (searchArgs, sessionToken, limit, skip) =>
  new OrderService().search(
    addSortOptionToCriteria(getCriteria(searchArgs), searchArgs.get('sortOption'))
      .set('limit', limit)
      .set('skip', skip),
    sessionToken,
  );

export const getOrders = async (searchArgs, sessionToken) => {
  const count = await getOrdersCountMatchCriteria(searchArgs, sessionToken);

  if (count === 0) {
    return Common.getEmptyResult();
  }

  const { limit, skip, hasNextPage, hasPreviousPage } = RelayHelper.getLimitAndSkipValue(searchArgs, count, 10, 1000);
  const results = await getOrdersMatchCriteria(searchArgs, sessionToken, limit, skip);

  return Common.convertResultsToRelayConnectionResponse(results, skip, limit, count, hasNextPage, hasPreviousPage);
};

export default connectionDefinitions({
  name: 'OrderType',
  nodeType: Order,
});
