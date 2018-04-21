'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getChoiceItems = undefined;

var _commonJavascript = require('@microbusiness/common-javascript');

var _parseServerCommon = require('@fingermenu/parse-server-common');

var _immutable = require('immutable');

var _graphqlRelay = require('graphql-relay');

var _ChoiceItem = require('./ChoiceItem');

var _ChoiceItem2 = _interopRequireDefault(_ChoiceItem);

var _Common = require('./Common');

var _Common2 = _interopRequireDefault(_Common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var getCriteria = function getCriteria(searchArgs, addedByUserId, language) {
  return _commonJavascript.ImmutableEx.removeUndefinedProps((0, _immutable.Map)({
    language: language,
    ids: searchArgs.has('choiceItemIds') ? searchArgs.get('choiceItemIds') : undefined,
    conditions: (0, _immutable.Map)({
      addedByUserId: addedByUserId,
      doesNotExist_removedByUser: true,
      contains_names: _commonJavascript.StringHelper.convertStringArgumentToSet(searchArgs.get('name')),
      contains_descriptions: _commonJavascript.StringHelper.convertStringArgumentToSet(searchArgs.get('description'))
    })
  }));
};

var addSortOptionToCriteria = function addSortOptionToCriteria(criteria, sortOption, language) {
  if (sortOption && sortOption.localeCompare('NameDescending') === 0) {
    return criteria.set('orderByFieldDescending', language + '_name');
  }

  if (sortOption && sortOption.localeCompare('NameAscending') === 0) {
    return criteria.set('orderByFieldAscending', language + '_name');
  }

  if (sortOption && sortOption.localeCompare('DescriptionDescending') === 0) {
    return criteria.set('orderByFieldDescending', language + '_description');
  }

  if (sortOption && sortOption.localeCompare('DescriptionAscending') === 0) {
    return criteria.set('orderByFieldAscending', language + '_description');
  }

  return criteria.set('orderByFieldAscending', language + '_name');
};

var getChoiceItemsCountMatchCriteria = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(searchArgs, addedByUserId, sessionToken, language) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', new _parseServerCommon.ChoiceItemService().count(addSortOptionToCriteria(getCriteria(searchArgs, addedByUserId, language), searchArgs.get('sortOption'), language), sessionToken));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getChoiceItemsCountMatchCriteria(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

var getChoiceItemsMatchCriteria = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(searchArgs, addedByUserId, sessionToken, language, limit, skip) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt('return', new _parseServerCommon.ChoiceItemService().search(addSortOptionToCriteria(getCriteria(searchArgs, addedByUserId, language), searchArgs.get('sortOption'), language).merge((0, _immutable.Map)({ limit: limit, skip: skip })), sessionToken));

          case 1:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function getChoiceItemsMatchCriteria(_x5, _x6, _x7, _x8, _x9, _x10) {
    return _ref2.apply(this, arguments);
  };
}();

var getChoiceItems = exports.getChoiceItems = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(searchArgs, _ref4, sessionToken, language) {
    var userLoaderBySessionToken = _ref4.userLoaderBySessionToken;

    var userId, count, _RelayHelper$getLimit, limit, skip, hasNextPage, hasPreviousPage, results;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return userLoaderBySessionToken.load(sessionToken);

          case 2:
            userId = _context3.sent.id;
            _context3.next = 5;
            return getChoiceItemsCountMatchCriteria(searchArgs, userId, sessionToken, language);

          case 5:
            count = _context3.sent;

            if (!(count === 0)) {
              _context3.next = 8;
              break;
            }

            return _context3.abrupt('return', _Common2.default.getEmptyResult());

          case 8:
            _RelayHelper$getLimit = _commonJavascript.RelayHelper.getLimitAndSkipValue(searchArgs, count, 10, 1000), limit = _RelayHelper$getLimit.limit, skip = _RelayHelper$getLimit.skip, hasNextPage = _RelayHelper$getLimit.hasNextPage, hasPreviousPage = _RelayHelper$getLimit.hasPreviousPage;
            _context3.next = 11;
            return getChoiceItemsMatchCriteria(searchArgs, userId, sessionToken, language, limit, skip);

          case 11:
            results = _context3.sent;
            return _context3.abrupt('return', _Common2.default.convertResultsToRelayConnectionResponse(results, skip, limit, count, hasNextPage, hasPreviousPage));

          case 13:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function getChoiceItems(_x11, _x12, _x13, _x14) {
    return _ref3.apply(this, arguments);
  };
}();

exports.default = (0, _graphqlRelay.connectionDefinitions)({
  name: 'ChoiceItemType',
  nodeType: _ChoiceItem2.default
});