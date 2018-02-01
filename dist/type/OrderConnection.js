'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOrders = undefined;

var _immutable = require('immutable');

var _graphqlRelay = require('graphql-relay');

var _commonJavascript = require('@microbusiness/common-javascript');

var _parseServerCommon = require('@fingermenu/parse-server-common');

var _Order = require('./Order');

var _Order2 = _interopRequireDefault(_Order);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var getCriteria = function getCriteria(searchArgs) {
  return (0, _immutable.Map)({
    ids: searchArgs.has('orderIds') ? searchArgs.get('orderIds') : undefined,
    conditions: (0, _immutable.Map)({
      contains_names: _commonJavascript.StringHelper.convertStringArgumentToSet(searchArgs.get('name')),
      contains_customerNames: _commonJavascript.StringHelper.convertStringArgumentToSet(searchArgs.get('customerName')),
      contains_notess: _commonJavascript.StringHelper.convertStringArgumentToSet(searchArgs.get('notes'))
    })
  }).merge(searchArgs.has('restaurantId') ? (0, _immutable.Map)({ conditions: (0, _immutable.Map)({ restaurantId: searchArgs.get('restaurantId') }) }) : (0, _immutable.Map)()).merge(searchArgs.has('tableId') ? (0, _immutable.Map)({ conditions: (0, _immutable.Map)({ tableId: searchArgs.get('tableId') }) }) : (0, _immutable.Map)()).merge(searchArgs.has('orderStateId') ? (0, _immutable.Map)({ conditions: (0, _immutable.Map)({ orderStateId: searchArgs.get('orderStateId') }) }) : (0, _immutable.Map)());
};

var addSortOptionToCriteria = function addSortOptionToCriteria(criteria, sortOption) {
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

var getOrdersCountMatchCriteria = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(searchArgs, sessionToken) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', new _parseServerCommon.OrderService().count(addSortOptionToCriteria(getCriteria(searchArgs), searchArgs.get('sortOption')), sessionToken));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getOrdersCountMatchCriteria(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var getOrdersMatchCriteria = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(searchArgs, sessionToken, limit, skip) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt('return', new _parseServerCommon.OrderService().search(addSortOptionToCriteria(getCriteria(searchArgs), searchArgs.get('sortOption')).set('limit', limit).set('skip', skip), sessionToken));

          case 1:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function getOrdersMatchCriteria(_x3, _x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

var getOrders = exports.getOrders = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(searchArgs, dataLoaders, sessionToken) {
    var orderStateId, finalSearchArgs, count, _RelayHelper$getLimit, limit, skip, hasNextPage, hasPreviousPage, orders, indexedOrders, edges, firstEdge, lastEdge;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!searchArgs.get('orderState')) {
              _context3.next = 6;
              break;
            }

            _context3.next = 3;
            return dataLoaders.orderStateLoaderByKey(searchArgs.get('orderState'));

          case 3:
            _context3.t0 = _context3.sent;
            _context3.next = 7;
            break;

          case 6:
            _context3.t0 = null;

          case 7:
            orderStateId = _context3.t0;
            finalSearchArgs = searchArgs.merge(orderStateId ? (0, _immutable.Map)({ orderStateId: orderStateId }) : (0, _immutable.Map)());
            _context3.next = 11;
            return getOrdersCountMatchCriteria(finalSearchArgs, sessionToken);

          case 11:
            count = _context3.sent;
            _RelayHelper$getLimit = _commonJavascript.RelayHelper.getLimitAndSkipValue(finalSearchArgs, count, 10, 1000), limit = _RelayHelper$getLimit.limit, skip = _RelayHelper$getLimit.skip, hasNextPage = _RelayHelper$getLimit.hasNextPage, hasPreviousPage = _RelayHelper$getLimit.hasPreviousPage;
            _context3.next = 15;
            return getOrdersMatchCriteria(finalSearchArgs, sessionToken, limit, skip);

          case 15:
            orders = _context3.sent;
            indexedOrders = orders.zip((0, _immutable.Range)(skip, skip + limit));
            edges = indexedOrders.map(function (indexedItem) {
              return {
                node: indexedItem[0],
                cursor: indexedItem[1] + 1
              };
            });
            firstEdge = edges.first();
            lastEdge = edges.last();
            return _context3.abrupt('return', {
              edges: edges.toArray(),
              count: count,
              pageInfo: {
                startCursor: firstEdge ? firstEdge.cursor : 'cursor not available',
                endCursor: lastEdge ? lastEdge.cursor : 'cursor not available',
                hasPreviousPage: hasPreviousPage,
                hasNextPage: hasNextPage
              }
            });

          case 21:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function getOrders(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

exports.default = (0, _graphqlRelay.connectionDefinitions)({
  name: 'OrderType',
  nodeType: _Order2.default
});