'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOrder = undefined;

var _graphql = require('graphql');

var _parseServerCommon = require('@fingermenu/parse-server-common');

var _interface = require('../interface');

var _OrderState = require('./OrderState');

var _OrderState2 = _interopRequireDefault(_OrderState);

var _Table = require('./Table');

var _Table2 = _interopRequireDefault(_Table);

var _OrderMenuItemPrice = require('./OrderMenuItemPrice');

var _OrderMenuItemPrice2 = _interopRequireDefault(_OrderMenuItemPrice);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var getOrder = exports.getOrder = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(orderId, sessionToken) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', new _parseServerCommon.OrderService().read(orderId, null, sessionToken));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getOrder(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = new _graphql.GraphQLObjectType({
  name: 'Order',
  fields: {
    id: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLID),
      resolve: function resolve(_) {
        return _.get('id');
      }
    },
    customerName: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('customerName');
      }
    },
    notes: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('notes');
      }
    },
    totalPrice: {
      type: _graphql.GraphQLFloat,
      resolve: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_) {
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  return _context2.abrupt('return', _.get('totalPrice'));

                case 1:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, undefined);
        }));

        return function resolve(_x3) {
          return _ref2.apply(this, arguments);
        };
      }()
    },
    placedAt: {
      type: _graphql.GraphQLString,
      resolve: function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_) {
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  return _context3.abrupt('return', _.get('placedAt'));

                case 1:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, undefined);
        }));

        return function resolve(_x4) {
          return _ref3.apply(this, arguments);
        };
      }()
    },
    table: {
      type: _Table2.default,
      resolve: function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_, args, _ref5) {
          var sessionToken = _ref5.sessionToken;
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  return _context4.abrupt('return', _.get('tableId') ? (0, _Table.getTable)(_.get('tableId'), sessionToken) : null);

                case 1:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee4, undefined);
        }));

        return function resolve(_x5, _x6, _x7) {
          return _ref4.apply(this, arguments);
        };
      }()
    },
    orderState: {
      type: _OrderState2.default,
      resolve: function () {
        var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(_, args, _ref7) {
          var dataLoaders = _ref7.dataLoaders;
          return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  return _context5.abrupt('return', _.get('orderStateId') ? dataLoaders.orderStateLoaderById.load(_.get('orderStateId')) : null);

                case 1:
                case 'end':
                  return _context5.stop();
              }
            }
          }, _callee5, undefined);
        }));

        return function resolve(_x8, _x9, _x10) {
          return _ref6.apply(this, arguments);
        };
      }()
    },
    details: {
      type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(_OrderMenuItemPrice2.default)),
      resolve: function resolve() {
        return [];
      }
    }
  },
  interfaces: [_interface.NodeInterface]
});