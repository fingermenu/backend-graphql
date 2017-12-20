'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getChoiceItems = undefined;

var _immutable = require('immutable');

var _graphqlRelay = require('graphql-relay');

var _microBusinessCommonJavascript = require('micro-business-common-javascript');

var _fingerMenuParseServerCommon = require('finger-menu-parse-server-common');

var _ChoiceItem = require('./ChoiceItem');

var _ChoiceItem2 = _interopRequireDefault(_ChoiceItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var getCriteria = function getCriteria(searchArgs, ownedByUserId) {
  return (0, _immutable.Map)({
    include_parentChoiceItem: true,
    ids: searchArgs.has('choiceItemIds') ? searchArgs.get('choiceItemIds') : undefined,
    conditions: (0, _immutable.Map)({
      ownedByUserId: ownedByUserId,
      contains_names: _microBusinessCommonJavascript.StringHelper.convertStringArgumentToSet(searchArgs.get('name')),
      contains_descriptions: _microBusinessCommonJavascript.StringHelper.convertStringArgumentToSet(searchArgs.get('description'))
    })
  });
};

var addSortOptionToCriteria = function addSortOptionToCriteria(criteria, sortOption) {
  if (sortOption && sortOption.localeCompare('NameDescending') === 0) {
    return criteria.set('orderByFieldDescending', 'name');
  }

  if (sortOption && sortOption.localeCompare('NameAscending') === 0) {
    return criteria.set('orderByFieldAscending', 'name');
  }

  if (sortOption && sortOption.localeCompare('DescriptionDescending') === 0) {
    return criteria.set('orderByFieldDescending', 'description');
  }

  if (sortOption && sortOption.localeCompare('DescriptionAscending') === 0) {
    return criteria.set('orderByFieldAscending', 'description');
  }

  return criteria.set('orderByFieldAscending', 'name');
};

var getChoiceItemsCountMatchCriteria = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(searchArgs, ownedByUserId, sessionToken) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', new _fingerMenuParseServerCommon.ChoiceItemService().count(addSortOptionToCriteria(getCriteria(searchArgs, ownedByUserId), searchArgs.get('sortOption')), sessionToken));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getChoiceItemsCountMatchCriteria(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var getChoiceItemsMatchCriteria = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(searchArgs, ownedByUserId, sessionToken, limit, skip) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt('return', new _fingerMenuParseServerCommon.ChoiceItemService().search(addSortOptionToCriteria(getCriteria(searchArgs, ownedByUserId), searchArgs.get('sortOption')).set('limit', limit).set('skip', skip), sessionToken));

          case 1:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function getChoiceItemsMatchCriteria(_x4, _x5, _x6, _x7, _x8) {
    return _ref2.apply(this, arguments);
  };
}();

var getChoiceItems = exports.getChoiceItems = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(searchArgs, dataLoaders, sessionToken) {
    var userId, count, _RelayHelper$getLimit, limit, skip, hasNextPage, hasPreviousPage, choiceItems, indexedChoiceItems, edges, firstEdge, lastEdge;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return dataLoaders.userLoaderBySessionToken.load(sessionToken);

          case 2:
            userId = _context3.sent.id;
            _context3.next = 5;
            return getChoiceItemsCountMatchCriteria(searchArgs, userId, sessionToken);

          case 5:
            count = _context3.sent;
            _RelayHelper$getLimit = _microBusinessCommonJavascript.RelayHelper.getLimitAndSkipValue(searchArgs, count, 10, 1000), limit = _RelayHelper$getLimit.limit, skip = _RelayHelper$getLimit.skip, hasNextPage = _RelayHelper$getLimit.hasNextPage, hasPreviousPage = _RelayHelper$getLimit.hasPreviousPage;
            _context3.next = 9;
            return getChoiceItemsMatchCriteria(searchArgs, userId, sessionToken, limit, skip);

          case 9:
            choiceItems = _context3.sent;
            indexedChoiceItems = choiceItems.zip((0, _immutable.Range)(skip, skip + limit));
            edges = indexedChoiceItems.map(function (indexedItem) {
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

          case 15:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function getChoiceItems(_x9, _x10, _x11) {
    return _ref3.apply(this, arguments);
  };
}();

exports.default = (0, _graphqlRelay.connectionDefinitions)({
  name: 'ChoiceItemType',
  nodeType: _ChoiceItem2.default
});