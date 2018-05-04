'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOrders = undefined;

var _commonJavascript = require('@microbusiness/common-javascript');

var _parseServerCommon = require('@fingermenu/parse-server-common');

var _jsJoda = require('js-joda');

var _immutable = require('immutable');

var _graphqlRelay = require('graphql-relay');

var _Order = require('./Order');

var _Order2 = _interopRequireDefault(_Order);

var _Common = require('./Common');

var _Common2 = _interopRequireDefault(_Common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var getCriteria = function getCriteria(searchArgs) {
  var dateRange = void 0;

  if (searchArgs.has('dateRange')) {
    dateRange = {
      from: (0, _jsJoda.convert)(_jsJoda.ZonedDateTime.parse(searchArgs.getIn(['dateRange', 'from']))).toDate(),
      to: (0, _jsJoda.convert)(_jsJoda.ZonedDateTime.parse(searchArgs.getIn(['dateRange', 'to']))).toDate()
    };

    if (dateRange.to < dateRange.from) {
      throw new Error('dateRange is invalid. \'to\' is less than \'from\'.');
    }
  }

  var criteria = (0, _immutable.Map)({
    ids: searchArgs.has('orderIds') ? searchArgs.get('orderIds') : undefined,
    conditions: (0, _immutable.Map)({
      correlationId: searchArgs.has('correlationId') ? searchArgs.get('correlationId') : undefined,
      contains_names: _commonJavascript.StringHelper.convertStringArgumentToSet(searchArgs.get('name')),
      contains_notess: _commonJavascript.StringHelper.convertStringArgumentToSet(searchArgs.get('notes')),
      exist_cancelledAt: searchArgs.has('includeCancelledOrders') && searchArgs.get('includeCancelledOrders') ? true : undefined,
      deosNotExist_cancelledAt: !searchArgs.has('includeCancelledOrders') || !searchArgs.get('includeCancelledOrders') ? true : undefined,
      restaurantId: searchArgs.has('restaurantId') ? searchArgs.get('restaurantId') : undefined,
      tableId: searchArgs.has('tableId') ? searchArgs.get('tableId') : undefined,
      greaterThanOrEqualTo_placedAt: dateRange ? dateRange.from : undefined,
      lessThanOrEqualTo_placedAt: dateRange ? dateRange.to : undefined
    })
  });

  return _commonJavascript.ImmutableEx.removeUndefinedProps(criteria);
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

  return criteria.set('PlacedAtDescending', 'placedAt');
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
            return _context2.abrupt('return', new _parseServerCommon.OrderService().search(addSortOptionToCriteria(getCriteria(searchArgs), searchArgs.get('sortOption')).merge((0, _immutable.Map)({ limit: limit, skip: skip })), sessionToken));

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
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(searchArgs, sessionToken) {
    var count, _RelayHelper$getLimit, limit, skip, hasNextPage, hasPreviousPage, results;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return getOrdersCountMatchCriteria(searchArgs, sessionToken);

          case 2:
            count = _context3.sent;

            if (!(count === 0)) {
              _context3.next = 5;
              break;
            }

            return _context3.abrupt('return', _Common2.default.getEmptyResult());

          case 5:
            _RelayHelper$getLimit = _commonJavascript.RelayHelper.getLimitAndSkipValue(searchArgs, count, 10, 1000), limit = _RelayHelper$getLimit.limit, skip = _RelayHelper$getLimit.skip, hasNextPage = _RelayHelper$getLimit.hasNextPage, hasPreviousPage = _RelayHelper$getLimit.hasPreviousPage;
            _context3.next = 8;
            return getOrdersMatchCriteria(searchArgs, sessionToken, limit, skip);

          case 8:
            results = _context3.sent;
            return _context3.abrupt('return', _Common2.default.convertResultsToRelayConnectionResponse(results, skip, limit, count, hasNextPage, hasPreviousPage));

          case 10:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function getOrders(_x7, _x8) {
    return _ref3.apply(this, arguments);
  };
}();

exports.default = (0, _graphqlRelay.connectionDefinitions)({
  name: 'OrderType',
  nodeType: _Order2.default
});