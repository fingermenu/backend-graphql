'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cancelOrder = exports.updateOrder = exports.addOrder = exports.addOrderForProvidedUser = undefined;

var _parseServerCommon = require('@microbusiness/parse-server-common');

var _parseServerCommon2 = require('@fingermenu/parse-server-common');

var _commonJavascript = require('@microbusiness/common-javascript');

var _cuid = require('cuid');

var _cuid2 = _interopRequireDefault(_cuid);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _TableHelper = require('./TableHelper');

var _TableHelper2 = _interopRequireDefault(_TableHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var addOrderForProvidedUser = exports.addOrderForProvidedUser = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref2, user, dataLoaders, sessionToken) {
    var correlationId = _ref2.correlationId,
        numberOfAdults = _ref2.numberOfAdults,
        numberOfChildren = _ref2.numberOfChildren,
        customerName = _ref2.customerName,
        notes = _ref2.notes,
        restaurantId = _ref2.restaurantId,
        tableId = _ref2.tableId,
        details = _ref2.details;
    var acl, calculatedCorrelationId, newOrderId;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            acl = _parseServerCommon.ParseWrapperService.createACL(user);


            acl.setRoleReadAccess('administrators', true);
            acl.setRoleWriteAccess('administrators', true);

            calculatedCorrelationId = correlationId ? correlationId : (0, _cuid2.default)();
            _context.next = 6;
            return new _parseServerCommon2.OrderService().create((0, _immutable.Map)({
              correlationId: calculatedCorrelationId,
              numberOfAdults: numberOfAdults,
              numberOfChildren: numberOfChildren,
              customerName: customerName,
              notes: notes,
              placedAt: new Date(),
              restaurantId: restaurantId,
              tableId: tableId,
              details: _immutable2.default.fromJS(details)
            }), acl, sessionToken);

          case 6:
            newOrderId = _context.sent;

            if (_commonJavascript.Common.isNullOrUndefined(tableId)) {
              _context.next = 10;
              break;
            }

            _context.next = 10;
            return (0, _TableHelper2.default)({ id: tableId, lastOrderCorrelationId: calculatedCorrelationId }, dataLoaders, sessionToken);

          case 10:
            return _context.abrupt('return', newOrderId);

          case 11:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function addOrderForProvidedUser(_x, _x2, _x3, _x4) {
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
            return _context2.abrupt('return', addOrderForProvidedUser(info, user, dataLoaders, sessionToken));

          case 4:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function addOrder(_x5, _x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();

var updateOrder = exports.updateOrder = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_ref5, sessionToken) {
    var id = _ref5.id,
        numberOfAdults = _ref5.numberOfAdults,
        numberOfChildren = _ref5.numberOfChildren,
        customerName = _ref5.customerName,
        notes = _ref5.notes,
        restaurantId = _ref5.restaurantId,
        tableId = _ref5.tableId,
        details = _ref5.details,
        cancelledAt = _ref5.cancelledAt,
        paymentGroupId = _ref5.paymentGroupId;
    var orderInfo, paymentGroupPaidAt;
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
            orderInfo = (0, _immutable.Map)({ id: id }).merge(_commonJavascript.Common.isNullOrUndefined(numberOfAdults) ? (0, _immutable.Map)() : (0, _immutable.Map)({ numberOfAdults: numberOfAdults })).merge(_commonJavascript.Common.isNullOrUndefined(numberOfChildren) ? (0, _immutable.Map)() : (0, _immutable.Map)({ numberOfChildren: numberOfChildren })).merge(_commonJavascript.Common.isNullOrUndefined(customerName) ? (0, _immutable.Map)() : (0, _immutable.Map)({ customerName: customerName })).merge(_commonJavascript.Common.isNullOrUndefined(notes) ? (0, _immutable.Map)() : (0, _immutable.Map)({ notes: notes })).merge(_commonJavascript.Common.isNullOrUndefined(restaurantId) ? (0, _immutable.Map)() : (0, _immutable.Map)({ restaurantId: restaurantId })).merge(_commonJavascript.Common.isNullOrUndefined(tableId) ? (0, _immutable.Map)() : (0, _immutable.Map)({ tableId: tableId })).merge(_commonJavascript.Common.isNullOrUndefined(details) ? (0, _immutable.Map)() : (0, _immutable.Map)({ details: _immutable2.default.fromJS(details) })).merge(_commonJavascript.Common.isNullOrUndefined(cancelledAt) ? (0, _immutable.Map)() : (0, _immutable.Map)({ cancelledAt: cancelledAt }));
            paymentGroupPaidAt = new Date();


            if (details && paymentGroupId) {
              orderInfo = orderInfo.update('details', function (details) {
                return details.map(function (item) {
                  if (paymentGroupId.localeCompare(item.getIn(['paymentGroup', 'id'])) === 0) {
                    return item.setIn(['paymentGroup', 'paidAt'], paymentGroupPaidAt);
                  }

                  return item;
                });
              });
            }

            _context3.next = 7;
            return new _parseServerCommon2.OrderService().update(orderInfo, sessionToken);

          case 7:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function updateOrder(_x8, _x9) {
    return _ref4.apply(this, arguments);
  };
}();

var cancelOrder = exports.cancelOrder = function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(id, sessionToken) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return updateOrder({ id: id, cancelledAt: new Date() }, sessionToken);

          case 2:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function cancelOrder(_x10, _x11) {
    return _ref6.apply(this, arguments);
  };
}();