// @flow

import { convert, ZonedDateTime } from 'js-joda';
import { Map, Range } from 'immutable';
import { connectionDefinitions } from 'graphql-relay';
import { RelayHelper, StringHelper } from '@microbusiness/common-javascript';
import { OrderService } from '@fingermenu/parse-server-common';
import Order from './Order';

const getCriteria = (searchArgs) => {
  let dateRange;

  if (searchArgs.has('dateRange')) {
    dateRange = {
      from: convert(ZonedDateTime.parse(searchArgs.getIn(['dateRange', 'from']))).toDate(),
      to: convert(ZonedDateTime.parse(searchArgs.getIn(['dateRange', 'to']))).toDate(),
    };

    if (dateRange.to < dateRange.from) {
      throw new Error("dateRange is invalid. 'to' is less than 'from'.");
    }

    if (dateRange.to - dateRange.from > 1000 * 60 * 60 * 24) {
      throw new Error('dateRange is invalid. dateRange convers period longer than a day.');
    }
  }

  return Map({
    ids: searchArgs.has('orderIds') ? searchArgs.get('orderIds') : undefined,
    conditions: Map({
      contains_names: StringHelper.convertStringArgumentToSet(searchArgs.get('name')),
      contains_customerNames: StringHelper.convertStringArgumentToSet(searchArgs.get('customerName')),
      contains_notess: StringHelper.convertStringArgumentToSet(searchArgs.get('notes')),
    }),
  })
    .merge(searchArgs.has('includeCancelledOrders') && searchArgs.get('includeCancelledOrders')
      ? Map({ conditions: Map({ exist_cancelledAt: true }) })
      : Map({ conditions: Map({ doesNotExist_cancelledAt: true }) }))
    .merge(searchArgs.has('restaurantId') ? Map({ conditions: Map({ restaurantId: searchArgs.get('restaurantId') }) }) : Map())
    .merge(searchArgs.has('tableId') ? Map({ conditions: Map({ tableId: searchArgs.get('tableId') }) }) : Map())
    .merge(searchArgs.has('orderStateId') ? Map({ conditions: Map({ orderStateId: searchArgs.get('orderStateId') }) }) : Map())
    .merge(dateRange ? Map({ conditions: Map({ greaterThanOrEqualTo_placedAt: dateRange.from, lessThanOrEqualTo_placedAt: dateRange.to }) }) : Map());
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

  return criteria.set('orderByFieldAscending', 'totalPrice');
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

export const getOrders = async (searchArgs, dataLoaders, sessionToken) => {
  const orderStateId = searchArgs.get('orderState') ? await dataLoaders.orderStateLoaderByKey(searchArgs.get('orderState')) : null;
  const finalSearchArgs = searchArgs.merge(orderStateId ? Map({ orderStateId }) : Map());
  const count = await getOrdersCountMatchCriteria(finalSearchArgs, sessionToken);
  const {
    limit, skip, hasNextPage, hasPreviousPage,
  } = RelayHelper.getLimitAndSkipValue(finalSearchArgs, count, 10, 1000);
  const orders = await getOrdersMatchCriteria(finalSearchArgs, sessionToken, limit, skip);
  const indexedOrders = orders.zip(Range(skip, skip + limit));

  const edges = indexedOrders.map(indexedItem => ({
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
  name: 'OrderType',
  nodeType: Order,
});
