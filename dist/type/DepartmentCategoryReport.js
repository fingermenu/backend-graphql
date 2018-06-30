'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDepartmentCategoriesReport = undefined;

var _parseServerCommon = require('@fingermenu/parse-server-common');

var _immutable = require('immutable');

var _graphql = require('graphql');

var _jsJoda = require('js-joda');

var _DepartmentCategory = require('./DepartmentCategory');

var _DepartmentCategory2 = _interopRequireDefault(_DepartmentCategory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var getDepartmentCategoriesReport = exports.getDepartmentCategoriesReport = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(searchArgs, dataLoaders, sessionToken) {
    var dateTimeRange, criteria, orders, result, orderMenuItemPrices;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            dateTimeRange = void 0;

            if (!searchArgs.has('dateTimeRange')) {
              _context.next = 5;
              break;
            }

            dateTimeRange = {
              from: (0, _jsJoda.convert)(_jsJoda.ZonedDateTime.parse(searchArgs.getIn(['dateTimeRange', 'from']))).toDate(),
              to: (0, _jsJoda.convert)(_jsJoda.ZonedDateTime.parse(searchArgs.getIn(['dateTimeRange', 'to']))).toDate()
            };

            if (!(dateTimeRange.to < dateTimeRange.from)) {
              _context.next = 5;
              break;
            }

            throw new Error('dateTimeRange is invalid. \'to\' is less than \'from\'.');

          case 5:
            criteria = Map({
              ids: searchArgs.has('orderIds') ? searchArgs.get('orderIds') : undefined,
              conditions: Map({
                correlationId: searchArgs.has('correlationId') ? searchArgs.get('correlationId') : undefined,
                deosNotExist_cancelledAt: true,
                restaurantId: searchArgs.has('restaurantId') ? searchArgs.get('restaurantId') : undefined,
                greaterThanOrEqualTo_placedAt: dateTimeRange ? dateTimeRange.from : undefined,
                lessThanOrEqualTo_placedAt: dateTimeRange ? dateTimeRange.to : undefined
              })
            });
            orders = (0, _immutable.List)();
            result = new _parseServerCommon.OrderService().searchAll(criteria, sessionToken);
            _context.prev = 8;

            result.event.subscribe(function (info) {
              orders = orders.push(info);
            });

            _context.next = 12;
            return result.promise;

          case 12:
            _context.prev = 12;

            result.event.unsubscribeAll();
            return _context.finish(12);

          case 15:
            orderMenuItemPrices = orders.flatMap(function (order) {
              return order.get('details').filter(function (orderMenuItemPrice) {
                return orderMenuItemPrice.get('paid');
              });
            }).map(function (orderMenuItemPrice) {
              return Map({
                menuItemPriceId: orderMenuItemPrice.get('menuItemPriceId'),
                paymentGroup: orderMenuItemPrice.get('paymentGroup'),
                orderChoiceItemPrices: orderMenuItemPrice.get('orderChoiceItemPrices')
              });
            });
            return _context.abrupt('return', (0, _immutable.List)());

          case 17:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[8,, 12, 15]]);
  }));

  return function getDepartmentCategoriesReport(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var DepartmentSubCategoryReport = new _graphql.GraphQLObjectType({
  name: 'DepartmentSubCategoryReport',
  fields: {
    departmentCategory: {
      type: (0, _graphql.GraphQLNonNull)(_DepartmentCategory2.default),
      resolve: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_, args, _ref3) {
          var departmentCategoryLoaderById = _ref3.dataLoaders.departmentCategoryLoaderById;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  return _context2.abrupt('return', departmentCategoryLoaderById.load(_.get('departmentCategoryId')));

                case 1:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, undefined);
        }));

        return function resolve(_x4, _x5, _x6) {
          return _ref2.apply(this, arguments);
        };
      }()
    },
    totalSale: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLFloat),
      resolve: function resolve(_) {
        return _.get('totalSale');
      }
    },
    quantity: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt),
      resolve: function resolve(_) {
        return _.get('quantity');
      }
    }
  }
});

exports.default = new _graphql.GraphQLObjectType({
  name: 'DepartmentCategoryReport',
  fields: {
    departmentCategory: {
      type: (0, _graphql.GraphQLNonNull)(_DepartmentCategory2.default),
      resolve: function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_, args, _ref5) {
          var departmentCategoryLoaderById = _ref5.dataLoaders.departmentCategoryLoaderById;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  return _context3.abrupt('return', departmentCategoryLoaderById.load(_.get('departmentCategoryId')));

                case 1:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, undefined);
        }));

        return function resolve(_x7, _x8, _x9) {
          return _ref4.apply(this, arguments);
        };
      }()
    },
    totalSale: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLFloat),
      resolve: function resolve(_) {
        return _.get('totalSale');
      }
    },
    quantity: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt),
      resolve: function resolve(_) {
        return _.get('quantity');
      }
    },
    departmentSubCategoriesReport: {
      type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(DepartmentSubCategoryReport)),
      resolve: function resolve(_) {
        return _.get('departmentSubCategoriesReport');
      }
    }
  }
});