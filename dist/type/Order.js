'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOrder = undefined;

var _parseServerCommon = require('@fingermenu/parse-server-common');

var _graphql = require('graphql');

var _interface = require('../interface');

var _Restaurant = require('./Restaurant');

var _Restaurant2 = _interopRequireDefault(_Restaurant);

var _Table = require('./Table');

var _Table2 = _interopRequireDefault(_Table);

var _Customer = require('./Customer');

var _Customer2 = _interopRequireDefault(_Customer);

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
    correlationId: {
      type: _graphql.GraphQLID,
      resolve: function resolve(_) {
        return _.get('correlationId');
      }
    },
    notes: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('notes');
      }
    },
    placedAt: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLString),
      resolve: function resolve(_) {
        return _.get('placedAt').toISOString();
      }
    },
    cancelledAt: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('cancelledAt') ? _.get('cancelledAt').toISOString() : null;
      }
    },
    restaurant: {
      type: new _graphql.GraphQLNonNull(_Restaurant2.default),
      resolve: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_, args, _ref3) {
          var restaurantLoaderById = _ref3.dataLoaders.restaurantLoaderById;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  return _context2.abrupt('return', restaurantLoaderById.load(_.get('restaurantId')));

                case 1:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, undefined);
        }));

        return function resolve(_x3, _x4, _x5) {
          return _ref2.apply(this, arguments);
        };
      }()
    },
    table: {
      type: _Table2.default,
      resolve: function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_, args, _ref5) {
          var tableLoaderById = _ref5.dataLoaders.tableLoaderById;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  return _context3.abrupt('return', _.get('tableId') ? tableLoaderById.load(_.get('tableId')) : null);

                case 1:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, undefined);
        }));

        return function resolve(_x6, _x7, _x8) {
          return _ref4.apply(this, arguments);
        };
      }()
    },
    details: {
      type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(_OrderMenuItemPrice2.default)),
      resolve: function resolve(_) {
        return _.get('details').toArray();
      }
    },
    customers: {
      type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(_Customer2.default)),
      resolve: function resolve(_) {
        return _.get('customers').toArray();
      }
    }
  },
  interfaces: [_interface.NodeInterface]
});