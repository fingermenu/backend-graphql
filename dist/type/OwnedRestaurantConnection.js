'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOwnedRestaurants = undefined;

var _immutable = require('immutable');

var _graphqlRelay = require('graphql-relay');

var _microBusinessCommonJavascript = require('micro-business-common-javascript');

var _fingerMenuParseServerCommon = require('finger-menu-parse-server-common');

var _OwnedRestaurant = require('./OwnedRestaurant');

var _OwnedRestaurant2 = _interopRequireDefault(_OwnedRestaurant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var getCriteria = function getCriteria(searchArgs, ownedByUserId) {
  return (0, _immutable.Map)({
    include_parentRestaurant: true,
    ids: searchArgs.has('ownedRestaurantIds') ? searchArgs.get('ownedRestaurantIds') : undefined,
    conditions: (0, _immutable.Map)({
      ownedByUserId: ownedByUserId,
      contains_names: _microBusinessCommonJavascript.StringHelper.convertStringArgumentToSet(searchArgs.get('name')),
      status: searchArgs.has('status') ? searchArgs.get('status') : undefined,
      inheritParentRestaurantMenus: searchArgs.has('inheritParentRestaurantMenus') ? searchArgs.get('inheritParentRestaurantMenus') : undefined
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

  if (sortOption && sortOption.localeCompare('AddressDescending') === 0) {
    return criteria.set('orderByFieldDescending', 'address');
  }

  if (sortOption && sortOption.localeCompare('AddressAscending') === 0) {
    return criteria.set('orderByFieldAscending', 'address');
  }

  if (sortOption && sortOption.localeCompare('StatusDescending') === 0) {
    return criteria.set('orderByFieldDescending', 'status');
  }

  if (sortOption && sortOption.localeCompare('StatusAscending') === 0) {
    return criteria.set('orderByFieldAscending', 'status');
  }

  if (sortOption && sortOption.localeCompare('InheritParentRestaurantMenusDescending') === 0) {
    return criteria.set('orderByFieldDescending', 'inheritParentRestaurantMenus');
  }

  if (sortOption && sortOption.localeCompare('InheritParentRestaurantMenusAscending') === 0) {
    return criteria.set('orderByFieldAscending', 'inheritParentRestaurantMenus');
  }

  return criteria.set('orderByFieldAscending', 'name');
};

var getOwnedRestaurantsCountMatchCriteria = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(searchArgs, ownedByUserId, sessionToken) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', new _fingerMenuParseServerCommon.RestaurantService().count(addSortOptionToCriteria(getCriteria(searchArgs, ownedByUserId), searchArgs.get('sortOption')), sessionToken));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getOwnedRestaurantsCountMatchCriteria(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var getOwnedRestaurantsMatchCriteria = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(searchArgs, ownedByUserId, sessionToken, limit, skip) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt('return', new _fingerMenuParseServerCommon.RestaurantService().search(addSortOptionToCriteria(getCriteria(searchArgs, ownedByUserId), searchArgs.get('sortOption')).set('limit', limit).set('skip', skip), sessionToken));

          case 1:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function getOwnedRestaurantsMatchCriteria(_x4, _x5, _x6, _x7, _x8) {
    return _ref2.apply(this, arguments);
  };
}();

var getOwnedRestaurants = exports.getOwnedRestaurants = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(searchArgs, dataLoaders, sessionToken) {
    var userId, count, _RelayHelper$getLimit, limit, skip, hasNextPage, hasPreviousPage, restaurants, indexedOwnedRestaurants, edges, firstEdge, lastEdge;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return dataLoaders.userLoaderBySessionToken.load(sessionToken);

          case 2:
            userId = _context3.sent.id;
            _context3.next = 5;
            return getOwnedRestaurantsCountMatchCriteria(searchArgs, userId, sessionToken);

          case 5:
            count = _context3.sent;
            _RelayHelper$getLimit = _microBusinessCommonJavascript.RelayHelper.getLimitAndSkipValue(searchArgs, count, 10, 1000), limit = _RelayHelper$getLimit.limit, skip = _RelayHelper$getLimit.skip, hasNextPage = _RelayHelper$getLimit.hasNextPage, hasPreviousPage = _RelayHelper$getLimit.hasPreviousPage;
            _context3.next = 9;
            return getOwnedRestaurantsMatchCriteria(searchArgs, userId, sessionToken, limit, skip);

          case 9:
            restaurants = _context3.sent;
            indexedOwnedRestaurants = restaurants.zip((0, _immutable.Range)(skip, skip + limit));
            edges = indexedOwnedRestaurants.map(function (indexedItem) {
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

  return function getOwnedRestaurants(_x9, _x10, _x11) {
    return _ref3.apply(this, arguments);
  };
}();

exports.default = (0, _graphqlRelay.connectionDefinitions)({
  name: 'OwnedRestaurantType',
  nodeType: _OwnedRestaurant2.default
});