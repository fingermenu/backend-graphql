'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _type = require('../type');

var _OrderHelper = require('./OrderHelper');

var _OrderMenuItemPrice = require('./OrderMenuItemPrice');

var _OrderMenuItemPrice2 = _interopRequireDefault(_OrderMenuItemPrice);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = (0, _graphqlRelay.mutationWithClientMutationId)({
  name: 'PlaceOrder',
  inputFields: {
    correlationId: { type: _graphql.GraphQLID },
    restaurantId: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLID) },
    numberOfAdults: { type: _graphql.GraphQLInt },
    numberOfChildren: { type: _graphql.GraphQLInt },
    customerName: { type: _graphql.GraphQLString },
    notes: { type: _graphql.GraphQLString },
    totalPrice: { type: _graphql.GraphQLFloat },
    tableId: { type: _graphql.GraphQLID },
    details: { type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(_OrderMenuItemPrice2.default)) }
  },
  outputFields: {
    order: {
      type: _type.OrderConnection.edgeType,
      resolve: function resolve(_) {
        return _.get('order');
      }
    }
  },
  mutateAndGetPayload: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(args, _ref2) {
      var dataLoaders = _ref2.dataLoaders,
          sessionToken = _ref2.sessionToken;
      var orderId;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _OrderHelper.addOrder)(args, dataLoaders, sessionToken);

            case 2:
              orderId = _context.sent;
              _context.t0 = _immutable.Map;
              _context.next = 6;
              return (0, _type.getOrders)((0, _immutable.Map)({ orderIds: _immutable.List.of(orderId) }), sessionToken);

            case 6:
              _context.t1 = _context.sent.edges[0];
              _context.t2 = {
                order: _context.t1
              };
              return _context.abrupt('return', (0, _context.t0)(_context.t2));

            case 9:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function mutateAndGetPayload(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }()
});