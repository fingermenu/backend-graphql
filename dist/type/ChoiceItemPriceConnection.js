'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getChoiceItemPrices = undefined;

var _commonJavascript = require('@microbusiness/common-javascript');

var _parseServerCommon = require('@fingermenu/parse-server-common');

var _immutable = require('immutable');

var _graphqlRelay = require('graphql-relay');

var _ChoiceItemPrice = require('./ChoiceItemPrice');

var _ChoiceItemPrice2 = _interopRequireDefault(_ChoiceItemPrice);

var _Common = require('./Common');

var _Common2 = _interopRequireDefault(_Common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var getCriteria = function getCriteria(searchArgs, ownedByUserId) {
  return _commonJavascript.ImmutableEx.removeUndefinedProps((0, _immutable.Map)({
    ids: searchArgs.has('choiceItemPriceIds') ? searchArgs.get('choiceItemPriceIds') : undefined,
    conditions: (0, _immutable.Map)({
      ownedByUserId: ownedByUserId
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

var getChoiceItemPricesCountMatchCriteria = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(searchArgs, ownedByUserId, sessionToken) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', new _parseServerCommon.ChoiceItemPriceService().count(addSortOptionToCriteria(getCriteria(searchArgs, ownedByUserId), searchArgs.get('sortOption')), sessionToken));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getChoiceItemPricesCountMatchCriteria(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var getChoiceItemPricesMatchCriteria = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(searchArgs, ownedByUserId, sessionToken, limit, skip) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt('return', new _parseServerCommon.ChoiceItemPriceService().search(addSortOptionToCriteria(getCriteria(searchArgs, ownedByUserId), searchArgs.get('sortOption')).merge((0, _immutable.Map)({ limit: limit, skip: skip })), sessionToken));

          case 1:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function getChoiceItemPricesMatchCriteria(_x4, _x5, _x6, _x7, _x8) {
    return _ref2.apply(this, arguments);
  };
}();

var getChoiceItemPrices = exports.getChoiceItemPrices = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(searchArgs, _ref4, sessionToken) {
    var userLoaderBySessionToken = _ref4.userLoaderBySessionToken,
        menuItemPriceLoaderById = _ref4.menuItemPriceLoaderById;

    var finalSearchArgs, menuItemPriceId, menuItemPrice, choiceItemPriceIds, userId, count, _RelayHelper$getLimit, limit, skip, hasNextPage, hasPreviousPage, results, choiceItemPriceSortOrderIndices;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            finalSearchArgs = searchArgs;
            menuItemPriceId = finalSearchArgs.get('menuItemPriceId');
            menuItemPrice = void 0;

            if (!menuItemPriceId) {
              _context3.next = 11;
              break;
            }

            _context3.next = 6;
            return menuItemPriceLoaderById.load(menuItemPriceId);

          case 6:
            menuItemPrice = _context3.sent;
            choiceItemPriceIds = menuItemPrice.get('choiceItemPriceIds');

            if (!(!choiceItemPriceIds || choiceItemPriceIds.isEmpty())) {
              _context3.next = 10;
              break;
            }

            return _context3.abrupt('return', _Common2.default.getEmptyResult());

          case 10:

            finalSearchArgs = finalSearchArgs.set('choiceItemPriceIds', choiceItemPriceIds);

          case 11:
            _context3.next = 13;
            return userLoaderBySessionToken.load(sessionToken);

          case 13:
            userId = _context3.sent.id;
            _context3.next = 16;
            return getChoiceItemPricesCountMatchCriteria(finalSearchArgs, userId, sessionToken);

          case 16:
            count = _context3.sent;

            if (!(count === 0)) {
              _context3.next = 19;
              break;
            }

            return _context3.abrupt('return', _Common2.default.getEmptyResult());

          case 19:
            _RelayHelper$getLimit = _commonJavascript.RelayHelper.getLimitAndSkipValue(finalSearchArgs, count, 10, 1000), limit = _RelayHelper$getLimit.limit, skip = _RelayHelper$getLimit.skip, hasNextPage = _RelayHelper$getLimit.hasNextPage, hasPreviousPage = _RelayHelper$getLimit.hasPreviousPage;
            _context3.next = 22;
            return getChoiceItemPricesMatchCriteria(finalSearchArgs, userId, sessionToken, limit, skip);

          case 22:
            results = _context3.sent;


            if (menuItemPrice) {
              choiceItemPriceSortOrderIndices = menuItemPrice.get('choiceItemPriceSortOrderIndices');


              if (choiceItemPriceSortOrderIndices) {
                results = results.map(function (_) {
                  return _.set('sortOrderIndex', choiceItemPriceSortOrderIndices.get(_.get('id')));
                });
              }
            }

            return _context3.abrupt('return', _Common2.default.convertResultsToRelayConnectionResponse(results, skip, limit, count, hasNextPage, hasPreviousPage));

          case 25:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function getChoiceItemPrices(_x9, _x10, _x11) {
    return _ref3.apply(this, arguments);
  };
}();

exports.default = (0, _graphqlRelay.connectionDefinitions)({
  name: 'ChoiceItemPriceType',
  nodeType: _ChoiceItemPrice2.default
});