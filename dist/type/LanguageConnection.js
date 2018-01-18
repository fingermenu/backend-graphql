'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLanguages = undefined;

var _immutable = require('immutable');

var _graphqlRelay = require('graphql-relay');

var _commonJavascript = require('@microbusiness/common-javascript');

var _parseServerCommon = require('@fingermenu/parse-server-common');

var _Language = require('./Language');

var _Language2 = _interopRequireDefault(_Language);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var getCriteria = function getCriteria(searchArgs) {
  return (0, _immutable.Map)({
    ids: searchArgs.has('languageIds') ? searchArgs.get('languageIds') : undefined,
    conditions: (0, _immutable.Map)({
      contains_names: _commonJavascript.StringHelper.convertStringArgumentToSet(searchArgs.get('name'))
    })
  }).merge(searchArgs.has('key') ? (0, _immutable.Map)({
    conditions: (0, _immutable.Map)({
      key: searchArgs.get('key').trim().toLowerCase()
    })
  }) : (0, _immutable.Map)());
};

var addSortOptionToCriteria = function addSortOptionToCriteria(criteria, sortOption) {
  if (sortOption && sortOption.localeCompare('NameDescending') === 0) {
    return criteria.set('orderByFieldDescending', 'name');
  }

  if (sortOption && sortOption.localeCompare('NameAscending') === 0) {
    return criteria.set('orderByFieldAscending', 'name');
  }

  return criteria.set('orderByFieldAscending', 'name');
};

var getLanguagesCountMatchCriteria = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(searchArgs) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', new _parseServerCommon.LanguageService().count(addSortOptionToCriteria(getCriteria(searchArgs), searchArgs.get('sortOption'))));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getLanguagesCountMatchCriteria(_x) {
    return _ref.apply(this, arguments);
  };
}();

var getLanguagesMatchCriteria = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(searchArgs, limit, skip) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt('return', new _parseServerCommon.LanguageService().search(addSortOptionToCriteria(getCriteria(searchArgs), searchArgs.get('sortOption')).set('limit', limit).set('skip', skip)));

          case 1:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function getLanguagesMatchCriteria(_x2, _x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var getLanguages = exports.getLanguages = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(searchArgs) {
    var count, _RelayHelper$getLimit, limit, skip, hasNextPage, hasPreviousPage, languages, indexedLanguages, edges, firstEdge, lastEdge;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return getLanguagesCountMatchCriteria(searchArgs);

          case 2:
            count = _context3.sent;
            _RelayHelper$getLimit = _commonJavascript.RelayHelper.getLimitAndSkipValue(searchArgs, count, 10, 1000), limit = _RelayHelper$getLimit.limit, skip = _RelayHelper$getLimit.skip, hasNextPage = _RelayHelper$getLimit.hasNextPage, hasPreviousPage = _RelayHelper$getLimit.hasPreviousPage;
            _context3.next = 6;
            return getLanguagesMatchCriteria(searchArgs, limit, skip);

          case 6:
            languages = _context3.sent;
            indexedLanguages = languages.zip((0, _immutable.Range)(skip, skip + limit));
            edges = indexedLanguages.map(function (indexedItem) {
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

          case 12:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function getLanguages(_x5) {
    return _ref3.apply(this, arguments);
  };
}();

exports.default = (0, _graphqlRelay.connectionDefinitions)({
  name: 'LanguageType',
  nodeType: _Language2.default
});