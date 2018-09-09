'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Common = function Common() {
  _classCallCheck(this, Common);
};

Common.getEmptyResult = function () {
  return {
    edges: [],
    count: 0,
    pageInfo: {
      startCursor: 'cursor not available',
      endCursor: 'cursor not available',
      hasPreviousPage: false,
      hasNextPage: false
    }
  };
};

Common.convertResultsToRelayConnectionResponse = function (results, skip, limit, count, hasNextPage, hasPreviousPage) {
  var indexedResults = results.zip((0, _immutable.Range)(skip, skip + limit));
  var edges = indexedResults.map(function (indexedResult) {
    return {
      node: indexedResult[0],
      cursor: indexedResult[1] + 1
    };
  });

  var firstEdge = edges.first();
  var lastEdge = edges.last();

  return {
    edges: edges.toArray(),
    count: count,
    pageInfo: {
      startCursor: firstEdge ? firstEdge.cursor : 'cursor not available',
      endCursor: lastEdge ? lastEdge.cursor : 'cursor not available',
      hasPreviousPage: hasPreviousPage,
      hasNextPage: hasNextPage
    }
  };
};

Common.getTranslationToDisplay = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(info, columnName, language, _ref2, _ref3) {
    var restaurantLoaderById = _ref2.restaurantLoaderById,
        configLoaderByKey = _ref2.configLoaderByKey;
    var restaurantId = _ref3.restaurantId;
    var allValues, defaultDisplay;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            allValues = info.get(columnName);

            if (allValues) {
              _context.next = 3;
              break;
            }

            return _context.abrupt('return', null);

          case 3:
            if (!allValues.has(language)) {
              _context.next = 5;
              break;
            }

            return _context.abrupt('return', allValues.get(language));

          case 5:
            if (!restaurantId) {
              _context.next = 12;
              break;
            }

            _context.next = 8;
            return restaurantLoaderById.load(restaurantId);

          case 8:
            _context.t0 = ['configurations', 'languages', 'defaultDisplay'];
            defaultDisplay = _context.sent.getIn(_context.t0);

            if (!(defaultDisplay && allValues.has(defaultDisplay))) {
              _context.next = 12;
              break;
            }

            return _context.abrupt('return', allValues.get(defaultDisplay));

          case 12:
            _context.t1 = allValues;
            _context.next = 15;
            return configLoaderByKey.load('fallbackLanguage');

          case 15:
            _context.t2 = _context.sent;
            return _context.abrupt('return', _context.t1.get.call(_context.t1, _context.t2));

          case 17:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();

Common.getTranslationToPrintOnKitchenReceipt = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(info, columnName, dataLoaders, fingerMenuContext) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt('return', Common.getTranslationToPrint(info, columnName, dataLoaders, fingerMenuContext, 'printOnKitchenReceipt'));

          case 1:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x6, _x7, _x8, _x9) {
    return _ref4.apply(this, arguments);
  };
}();

Common.getTranslationToPrintOnCustomerReceipt = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(info, columnName, dataLoaders, fingerMenuContext) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt('return', Common.getTranslationToPrint(info, columnName, dataLoaders, fingerMenuContext, 'printOnCustomerReceipt'));

          case 1:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function (_x10, _x11, _x12, _x13) {
    return _ref5.apply(this, arguments);
  };
}();

Common.getTranslationToPrint = function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(info, columnName, _ref7, _ref8, languageKey) {
    var restaurantLoaderById = _ref7.restaurantLoaderById,
        configLoaderByKey = _ref7.configLoaderByKey;
    var restaurantId = _ref8.restaurantId;
    var allValues, languageToPrint;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            allValues = info.get(columnName);

            if (allValues) {
              _context4.next = 3;
              break;
            }

            return _context4.abrupt('return', null);

          case 3:
            if (!restaurantId) {
              _context4.next = 10;
              break;
            }

            _context4.next = 6;
            return restaurantLoaderById.load(restaurantId);

          case 6:
            _context4.t0 = ['configurations', 'languages', languageKey];
            languageToPrint = _context4.sent.getIn(_context4.t0);

            if (!(languageToPrint && allValues.has(languageToPrint))) {
              _context4.next = 10;
              break;
            }

            return _context4.abrupt('return', allValues.get(languageToPrint));

          case 10:
            _context4.t1 = allValues;
            _context4.next = 13;
            return configLoaderByKey.load('fallbackLanguage');

          case 13:
            _context4.t2 = _context4.sent;
            return _context4.abrupt('return', _context4.t1.get.call(_context4.t1, _context4.t2));

          case 15:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function (_x14, _x15, _x16, _x17, _x18) {
    return _ref6.apply(this, arguments);
  };
}();

Common.mapMultilanguagesStringToStringWithLanguageCollection = function (info, columnName) {
  var allValues = info.get(columnName);

  if (!allValues) {
    return [];
  }

  return allValues.keySeq().map(function (language) {
    return (0, _immutable.Map)({ language: language, value: allValues.get(language) });
  }).toArray();
};

exports.default = Common;