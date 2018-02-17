'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMenuItemPrices = undefined;

var _commonJavascript = require('@microbusiness/common-javascript');

var _parseServerCommon = require('@fingermenu/parse-server-common');

var _immutable = require('immutable');

var _graphqlRelay = require('graphql-relay');

var _MenuItemPrice = require('./MenuItemPrice');

var _MenuItemPrice2 = _interopRequireDefault(_MenuItemPrice);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var getCriteria = function getCriteria(searchArgs, addedByUserId) {
  return _commonJavascript.ImmutableEx.removeUndefinedProps((0, _immutable.Map)({
    ids: searchArgs.has('menuItemPriceIds') ? searchArgs.get('menuItemPriceIds') : undefined,
    conditions: (0, _immutable.Map)({
      addedByUserId: addedByUserId,
      doesNotExist_removedByUser: true
    })
  }));
};

var addSortOptionToCriteria = function addSortOptionToCriteria(criteria, sortOption) {
  if (sortOption && sortOption.localeCompare('CurrentPriceDescending') === 0) {
    return criteria.set('orderByFieldDescending', 'currentPrice');
  }

  if (sortOption && sortOption.localeCompare('CurrentPriceAscending') === 0) {
    return criteria.set('orderByFieldAscending', 'currentPrice');
  }

  if (sortOption && sortOption.localeCompare('WasPriceDescending') === 0) {
    return criteria.set('orderByFieldDescending', 'wasPrice');
  }

  if (sortOption && sortOption.localeCompare('WasPriceAscending') === 0) {
    return criteria.set('orderByFieldAscending', 'wasPrice');
  }

  if (sortOption && sortOption.localeCompare('ValidFromDescending') === 0) {
    return criteria.set('orderByFieldDescending', 'validFrom');
  }

  if (sortOption && sortOption.localeCompare('ValidFromAscending') === 0) {
    return criteria.set('orderByFieldAscending', 'validFrom');
  }

  if (sortOption && sortOption.localeCompare('ValidUntilDescending') === 0) {
    return criteria.set('orderByFieldDescending', 'validUntil');
  }

  if (sortOption && sortOption.localeCompare('ValidUntilAscending') === 0) {
    return criteria.set('orderByFieldAscending', 'validUntil');
  }

  return criteria.set('orderByFieldAscending', 'currentPrice');
};

var getMenuItemPricesCountMatchCriteria = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(searchArgs, addedByUserId, sessionToken) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', new _parseServerCommon.MenuItemPriceService().count(addSortOptionToCriteria(getCriteria(searchArgs, addedByUserId), searchArgs.get('sortOption')), sessionToken));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getMenuItemPricesCountMatchCriteria(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var getMenuItemPricesMatchCriteria = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(searchArgs, addedByUserId, sessionToken, limit, skip) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt('return', new _parseServerCommon.MenuItemPriceService().search(addSortOptionToCriteria(getCriteria(searchArgs, addedByUserId), searchArgs.get('sortOption')).set('limit', limit).set('skip', skip), sessionToken));

          case 1:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function getMenuItemPricesMatchCriteria(_x4, _x5, _x6, _x7, _x8) {
    return _ref2.apply(this, arguments);
  };
}();

var getMenuItemPrices = exports.getMenuItemPrices = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(searchArgs, _ref4, sessionToken) {
    var userLoaderBySessionToken = _ref4.userLoaderBySessionToken,
        menuLoaderById = _ref4.menuLoaderById;

    var finalSearchArgs, menuId, menu, menuItemPriceIds, userId, count, _RelayHelper$getLimit, limit, skip, hasNextPage, hasPreviousPage, menuItemPrices, menuItemPriceSortOrderIndices, indexedMenuItemPrices, edges, firstEdge, lastEdge;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            finalSearchArgs = searchArgs;
            menuId = finalSearchArgs.get('menuId');
            menu = void 0;

            if (!menuId) {
              _context3.next = 11;
              break;
            }

            _context3.next = 6;
            return menuLoaderById.load(menuId);

          case 6:
            menu = _context3.sent;
            menuItemPriceIds = menu.get('menuItemPriceIds');

            if (!(!menuItemPriceIds || menuItemPriceIds.isEmpty())) {
              _context3.next = 10;
              break;
            }

            return _context3.abrupt('return', {
              edges: [],
              count: 0,
              pageInfo: {
                startCursor: 'cursor not available',
                endCursor: 'cursor not available',
                hasPreviousPage: false,
                hasNextPage: false
              }
            });

          case 10:

            finalSearchArgs = finalSearchArgs.set('menuItemPriceIds', menuItemPriceIds);

          case 11:
            _context3.next = 13;
            return userLoaderBySessionToken.load(sessionToken);

          case 13:
            userId = _context3.sent.id;
            _context3.next = 16;
            return getMenuItemPricesCountMatchCriteria(finalSearchArgs, userId, sessionToken);

          case 16:
            count = _context3.sent;
            _RelayHelper$getLimit = _commonJavascript.RelayHelper.getLimitAndSkipValue(finalSearchArgs, count, 10, 1000), limit = _RelayHelper$getLimit.limit, skip = _RelayHelper$getLimit.skip, hasNextPage = _RelayHelper$getLimit.hasNextPage, hasPreviousPage = _RelayHelper$getLimit.hasPreviousPage;
            _context3.next = 20;
            return getMenuItemPricesMatchCriteria(finalSearchArgs, userId, sessionToken, limit, skip);

          case 20:
            menuItemPrices = _context3.sent;


            if (menu) {
              menuItemPriceSortOrderIndices = menu.get('menuItemPriceSortOrderIndices');


              if (menuItemPriceSortOrderIndices) {
                menuItemPrices = menuItemPrices.map(function (_) {
                  return _.set('sortOrderIndex', menuItemPriceSortOrderIndices.get(_.get('id')));
                });
              }
            }

            indexedMenuItemPrices = menuItemPrices.zip((0, _immutable.Range)(skip, skip + limit));
            edges = indexedMenuItemPrices.map(function (indexedItem) {
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

          case 27:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function getMenuItemPrices(_x9, _x10, _x11) {
    return _ref3.apply(this, arguments);
  };
}();

exports.default = (0, _graphqlRelay.connectionDefinitions)({
  name: 'MenuItemPriceType',
  nodeType: _MenuItemPrice2.default
});