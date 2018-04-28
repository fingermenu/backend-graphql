'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _MenuItemPrice = require('./MenuItemPrice');

var _MenuItemPrice2 = _interopRequireDefault(_MenuItemPrice);

var _ServingTime = require('./ServingTime');

var _ServingTime2 = _interopRequireDefault(_ServingTime);

var _OrderChoiceItemPrice = require('./OrderChoiceItemPrice');

var _OrderChoiceItemPrice2 = _interopRequireDefault(_OrderChoiceItemPrice);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = new _graphql.GraphQLObjectType({
  name: 'OrderMenuItemPrice',
  fields: {
    id: {
      type: _graphql.GraphQLID,
      resolve: function resolve(_) {
        return _.get('id');
      }
    },
    groupId: {
      type: _graphql.GraphQLID,
      resolve: function resolve(_) {
        return _.get('groupId');
      }
    },
    paymentGroupId: {
      type: _graphql.GraphQLID,
      resolve: function resolve(_) {
        return _.get('paymentGroupId');
      }
    },
    paymentGroupDiscount: {
      type: _graphql.GraphQLFloat,
      resolve: function resolve(_) {
        return _.get('paymentGroupDiscount');
      }
    },
    printingDateTime: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('printingDateTime') ? _.get('printingDateTime') : null;
      }
    },
    menuItemPrice: {
      type: new _graphql.GraphQLNonNull(_MenuItemPrice2.default),
      resolve: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_, args, _ref2) {
          var dataLoaders = _ref2.dataLoaders;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  return _context.abrupt('return', _.get('menuItemPriceId') ? dataLoaders.menuItemPriceLoaderById.load(_.get('menuItemPriceId')) : null);

                case 1:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, undefined);
        }));

        return function resolve(_x, _x2, _x3) {
          return _ref.apply(this, arguments);
        };
      }()
    },
    quantity: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt),
      resolve: function resolve(_) {
        return _.get('quantity');
      }
    },
    notes: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('notes');
      }
    },
    paid: {
      type: _graphql.GraphQLBoolean,
      resolve: function resolve(_) {
        return _.get('paid');
      }
    },
    discount: {
      type: _graphql.GraphQLFloat,
      resolve: function resolve(_) {
        return _.get('discount');
      }
    },
    orderChoiceItemPrices: {
      type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(_OrderChoiceItemPrice2.default)),
      resolve: function resolve(_) {
        return _.get('orderChoiceItemPrices') ? _.get('orderChoiceItemPrices').toArray() : [];
      }
    },
    servingTime: {
      type: _ServingTime2.default,
      resolve: function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_, args, _ref4) {
          var dataLoaders = _ref4.dataLoaders;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  return _context2.abrupt('return', _.get('servingTimeId') ? dataLoaders.servingTimeLoaderById.load(_.get('servingTimeId')) : null);

                case 1:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, undefined);
        }));

        return function resolve(_x4, _x5, _x6) {
          return _ref3.apply(this, arguments);
        };
      }()
    }
  }
});