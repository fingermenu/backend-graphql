'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTables = undefined;

var _commonJavascript = require('@microbusiness/common-javascript');

var _parseServerCommon = require('@fingermenu/parse-server-common');

var _immutable = require('immutable');

var _graphqlRelay = require('graphql-relay');

var _Table = require('./Table');

var _Table2 = _interopRequireDefault(_Table);

var _Common = require('./Common');

var _Common2 = _interopRequireDefault(_Common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var getCriteria = function getCriteria(searchArgs, ownedByUserId, language) {
  return _commonJavascript.ImmutableEx.removeUndefinedProps((0, _immutable.Map)({
    language: language,
    ids: searchArgs.has('tableIds') ? searchArgs.get('tableIds') : undefined,
    conditions: (0, _immutable.Map)({
      ownedByUserId: ownedByUserId,
      contains_names: _commonJavascript.StringHelper.convertStringArgumentToSet(searchArgs.get('name')),
      contains_customerNames: _commonJavascript.StringHelper.convertStringArgumentToSet(searchArgs.get('customerName')),
      contains_notess: _commonJavascript.StringHelper.convertStringArgumentToSet(searchArgs.get('notes')),
      restaurantId: searchArgs.has('restaurantId') ? searchArgs.get('restaurantId') : undefined,
      tableStateId: searchArgs.has('tableStateId') ? searchArgs.get('tableStateId') : undefined
    })
  }));
};

var addSortOptionToCriteria = function addSortOptionToCriteria(criteria, sortOption, language) {
  if (sortOption && sortOption.localeCompare('SortOrderIndexDescending') === 0) {
    return criteria.set('orderByFieldDescending', 'sortOrderIndex');
  }

  if (sortOption && sortOption.localeCompare('SortOrderIndexAscending') === 0) {
    return criteria.set('orderByFieldAscending', 'sortOrderIndex');
  }

  if (sortOption && sortOption.localeCompare('NameDescending') === 0) {
    return criteria.set('orderByFieldDescending', language + '_name');
  }

  if (sortOption && sortOption.localeCompare('NameAscending') === 0) {
    return criteria.set('orderByFieldAscending', language + '_name');
  }

  if (sortOption && sortOption.localeCompare('NumberOfAdultsDescending') === 0) {
    return criteria.set('orderByFieldDescending', 'numberOfAdults');
  }

  if (sortOption && sortOption.localeCompare('NumberOfAdultsAscending') === 0) {
    return criteria.set('orderByFieldAscending', 'numberOfAdults');
  }

  if (sortOption && sortOption.localeCompare('NumberOfChildrenDescending') === 0) {
    return criteria.set('orderByFieldDescending', 'numberOfChildren');
  }

  if (sortOption && sortOption.localeCompare('NumberOfChildrenAscending') === 0) {
    return criteria.set('orderByFieldAscending', 'numberOfChildren');
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

  return criteria.set('orderByFieldAscending', 'sortOrderIndex');
};

var getTablesCountMatchCriteria = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(searchArgs, ownedByUserId, sessionToken, language) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', new _parseServerCommon.TableService().count(addSortOptionToCriteria(getCriteria(searchArgs, ownedByUserId, language), searchArgs.get('sortOption'), language), sessionToken));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getTablesCountMatchCriteria(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

var getTablesMatchCriteria = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(searchArgs, ownedByUserId, sessionToken, language, limit, skip) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt('return', new _parseServerCommon.TableService().search(addSortOptionToCriteria(getCriteria(searchArgs, ownedByUserId, language), searchArgs.get('sortOption'), language).set('limit', limit).set('skip', skip), sessionToken));

          case 1:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function getTablesMatchCriteria(_x5, _x6, _x7, _x8, _x9, _x10) {
    return _ref2.apply(this, arguments);
  };
}();

var getTables = exports.getTables = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(searchArgs, _ref4, sessionToken, language) {
    var userLoaderBySessionToken = _ref4.userLoaderBySessionToken,
        tableStateLoaderByKey = _ref4.tableStateLoaderByKey;

    var userId, tableStateId, finalSearchArgs, count, _RelayHelper$getLimit, limit, skip, hasNextPage, hasPreviousPage, results;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return userLoaderBySessionToken.load(sessionToken);

          case 2:
            userId = _context3.sent.id;

            if (!searchArgs.get('tableState')) {
              _context3.next = 9;
              break;
            }

            _context3.next = 6;
            return tableStateLoaderByKey(searchArgs.get('tableState'));

          case 6:
            _context3.t0 = _context3.sent;
            _context3.next = 10;
            break;

          case 9:
            _context3.t0 = null;

          case 10:
            tableStateId = _context3.t0;
            finalSearchArgs = searchArgs.merge(tableStateId ? (0, _immutable.Map)({ tableStateId: tableStateId }) : (0, _immutable.Map)());
            _context3.next = 14;
            return getTablesCountMatchCriteria(finalSearchArgs, userId, sessionToken, language);

          case 14:
            count = _context3.sent;

            if (!(count === 0)) {
              _context3.next = 17;
              break;
            }

            return _context3.abrupt('return', _Common2.default.getEmptyResult());

          case 17:
            _RelayHelper$getLimit = _commonJavascript.RelayHelper.getLimitAndSkipValue(finalSearchArgs, count, 10, 1000), limit = _RelayHelper$getLimit.limit, skip = _RelayHelper$getLimit.skip, hasNextPage = _RelayHelper$getLimit.hasNextPage, hasPreviousPage = _RelayHelper$getLimit.hasPreviousPage;
            _context3.next = 20;
            return getTablesMatchCriteria(finalSearchArgs, userId, sessionToken, language, limit, skip);

          case 20:
            results = _context3.sent;
            return _context3.abrupt('return', _Common2.default.convertResultsToRelayConnectionResponse(results, skip, limit, count, hasNextPage, hasPreviousPage));

          case 22:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function getTables(_x11, _x12, _x13, _x14) {
    return _ref3.apply(this, arguments);
  };
}();

exports.default = (0, _graphqlRelay.connectionDefinitions)({
  name: 'TableType',
  nodeType: _Table2.default
});