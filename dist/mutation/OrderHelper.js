'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cancelOrder = exports.updateOrder = exports.addOrder = exports.addOrderForProvidedUser = undefined;

var _commonJavascript = require('@microbusiness/common-javascript');

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _parseServerCommon = require('@microbusiness/parse-server-common');

var _parseServerCommon2 = require('@fingermenu/parse-server-common');

var _type = require('../type');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var addOrderForProvidedUser = exports.addOrderForProvidedUser = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref2, user, sessionToken) {
    var customerName = _ref2.customerName,
        notes = _ref2.notes,
        totalPrice = _ref2.totalPrice,
        tableId = _ref2.tableId,
        details = _ref2.details;
    var acl;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            acl = _parseServerCommon.ParseWrapperService.createACL(user);
            return _context.abrupt('return', new _parseServerCommon2.OrderService().create((0, _immutable.Map)({
              customerName: customerName,
              notes: notes,
              totalPrice: totalPrice,
              placedAt: new Date(),
              tableId: tableId,
              details: _immutable2.default.fromJS(details)
            }), acl, sessionToken));

          case 2:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function addOrderForProvidedUser(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var addOrder = exports.addOrder = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(info, dataLoaders, sessionToken) {
    var user;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return dataLoaders.userLoaderBySessionToken.load(sessionToken);

          case 2:
            user = _context2.sent;
            return _context2.abrupt('return', addOrderForProvidedUser(info, user, sessionToken));

          case 4:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function addOrder(_x4, _x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var updateOrder = exports.updateOrder = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_ref5, dataLoaders, sessionToken) {
    var id = _ref5.id,
        customerName = _ref5.customerName,
        notes = _ref5.notes,
        totalPrice = _ref5.totalPrice,
        tableId = _ref5.tableId,
        details = _ref5.details,
        tableState = _ref5.tableState;
    var orderInfo;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (id) {
              _context3.next = 2;
              break;
            }

            throw new Error('Order Id not provided.');

          case 2:
            _context3.next = 4;
            return (0, _type.getOrder)(id, sessionToken);

          case 4:
            _context3.t1 = _commonJavascript.Common.isNullOrUndefined(customerName) ? (0, _immutable.Map)() : (0, _immutable.Map)({ customerName: customerName });
            _context3.t2 = _commonJavascript.Common.isNullOrUndefined(notes) ? (0, _immutable.Map)() : (0, _immutable.Map)({ notes: notes });
            _context3.t3 = _commonJavascript.Common.isNullOrUndefined(totalPrice) ? (0, _immutable.Map)() : (0, _immutable.Map)({ totalPrice: totalPrice });
            _context3.t4 = _commonJavascript.Common.isNullOrUndefined(tableId) ? (0, _immutable.Map)() : (0, _immutable.Map)({ tableId: tableId });
            _context3.t5 = _commonJavascript.Common.isNullOrUndefined(details) ? (0, _immutable.Map)() : (0, _immutable.Map)({ details: _immutable2.default.fromJS(details) });
            _context3.t0 = _context3.sent.merge(_context3.t1).merge(_context3.t2).merge(_context3.t3).merge(_context3.t4).merge(_context3.t5);

            if (!_commonJavascript.Common.isNullOrUndefined(tableState)) {
              _context3.next = 14;
              break;
            }

            _context3.t6 = (0, _immutable.Map)();
            _context3.next = 20;
            break;

          case 14:
            _context3.t7 = _immutable.Map;
            _context3.next = 17;
            return dataLoaders.tableStateLoaderByKey.load(tableState);

          case 17:
            _context3.t8 = _context3.sent.get('id');
            _context3.t9 = {
              tableStateId: _context3.t8
            };
            _context3.t6 = (0, _context3.t7)(_context3.t9);

          case 20:
            _context3.t10 = _context3.t6;
            orderInfo = _context3.t0.merge.call(_context3.t0, _context3.t10);
            _context3.next = 24;
            return new _parseServerCommon2.OrderService().update(orderInfo, sessionToken);

          case 24:
            return _context3.abrupt('return', orderInfo);

          case 25:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function updateOrder(_x7, _x8, _x9) {
    return _ref4.apply(this, arguments);
  };
}();

var cancelOrder = exports.cancelOrder = function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(id, dataLoaders, sessionToken) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            return _context4.abrupt('return', updateOrder({ id: id }, dataLoaders, sessionToken));

          case 1:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function cancelOrder(_x10, _x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();