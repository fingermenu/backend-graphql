'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDepartmentCategoriesReport = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _commonJavascript = require('@microbusiness/common-javascript');

var _parseServerCommon = require('@fingermenu/parse-server-common');

var _immutable = require('immutable');

var _graphql = require('graphql');

var _jsJoda = require('js-joda');

var _cuid = require('cuid');

var _cuid2 = _interopRequireDefault(_cuid);

var _DepartmentCategory = require('./DepartmentCategory');

var _DepartmentCategory2 = _interopRequireDefault(_DepartmentCategory);

var _loaders = require('../loaders');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var otherDepartmentCategoryId = (0, _cuid2.default)();
var otherSubDepartmentCategoryId = (0, _cuid2.default)();

var getAllPaidOrders = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(searchArgs, sessionToken) {
    var dateTimeRange, criteriaToFetchOrders, result, orders;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            dateTimeRange = {
              from: (0, _jsJoda.convert)(_jsJoda.ZonedDateTime.parse(searchArgs.getIn(['dateTimeRange', 'from']))).toDate(),
              to: (0, _jsJoda.convert)(_jsJoda.ZonedDateTime.parse(searchArgs.getIn(['dateTimeRange', 'to']))).toDate()
            };

            if (!(dateTimeRange.to < dateTimeRange.from)) {
              _context.next = 3;
              break;
            }

            throw new Error('dateTimeRange is invalid. \'to\' is less than \'from\'.');

          case 3:
            criteriaToFetchOrders = (0, _immutable.Map)({
              conditions: (0, _immutable.Map)({
                deosNotExist_cancelledAt: true,
                restaurantId: searchArgs.has('restaurantId') ? searchArgs.get('restaurantId') : undefined,
                greaterThanOrEqualTo_placedAt: dateTimeRange ? dateTimeRange.from : undefined,
                lessThanOrEqualTo_placedAt: dateTimeRange ? dateTimeRange.to : undefined
              })
            });
            result = new _parseServerCommon.OrderService().searchAll(criteriaToFetchOrders, sessionToken);
            orders = (0, _immutable.List)();
            _context.prev = 6;

            result.event.subscribe(function (info) {
              orders = orders.push(info);
            });

            _context.next = 10;
            return result.promise;

          case 10:
            _context.prev = 10;

            result.event.unsubscribeAll();
            return _context.finish(10);

          case 13:
            return _context.abrupt('return', orders.flatMap(function (order) {
              return order.get('details').filter(function (orderMenuItemPrice) {
                return orderMenuItemPrice.get('paid');
              });
            }));

          case 14:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[6,, 10, 13]]);
  }));

  return function getAllPaidOrders(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var extractRequiredInfoFromOrderMenuItemPrices = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(orderMenuItemPrices, _ref3, sessionToken) {
    var menuItemPriceLoaderById = _ref3.menuItemPriceLoaderById,
        choiceItemPriceLoaderById = _ref3.choiceItemPriceLoaderById;
    var menuItemPriceIds, choiceItemPriceIds, menuItemPricesAndChoiceItemPrices;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            menuItemPriceIds = orderMenuItemPrices.map(function (orderMenuItemPrice) {
              return orderMenuItemPrice.get('menuItemPriceId');
            }).toSet();
            choiceItemPriceIds = orderMenuItemPrices.flatMap(function (orderMenuItemPrice) {
              return orderMenuItemPrice.get('choiceItemPriceIds');
            }).toSet();
            _context2.next = 4;
            return Promise.all([menuItemPriceLoaderById.loadMany(menuItemPriceIds.toArray()), choiceItemPriceLoaderById.loadMany(choiceItemPriceIds.toArray()), new _parseServerCommon.DepartmentCategoryService().search((0, _immutable.Map)(), sessionToken)]);

          case 4:
            menuItemPricesAndChoiceItemPrices = _context2.sent;
            return _context2.abrupt('return', {
              menuItemPrices: menuItemPricesAndChoiceItemPrices[0],
              choiceItemPrices: menuItemPricesAndChoiceItemPrices[1],
              departmentCategories: menuItemPricesAndChoiceItemPrices[2]
            });

          case 6:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function extractRequiredInfoFromOrderMenuItemPrices(_x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

var addPriceInfoToOrderMenuItemPrice = function addPriceInfoToOrderMenuItemPrice(orderMenuItemPrices, menuItemPrices, choiceItemPrices) {
  return orderMenuItemPrices.map(function (orderMenuItemPrice) {
    return orderMenuItemPrice.set('menuItemPrice', menuItemPrices.find(function (menuItemPrice) {
      return menuItemPrice.get('id').localeCompare(orderMenuItemPrice.get('menuItemPriceId')) === 0;
    })).update('orderChoiceItemPrices', function (orderChoiceItemPrices) {
      return orderChoiceItemPrices.map(function (orderChoiceItemPrice) {
        return orderChoiceItemPrice.set('choiceItemPrice', choiceItemPrices.find(function (choiceItemPrice) {
          return choiceItemPrice.get('id').localeCompare(orderChoiceItemPrice.get('choiceItemPriceId')) === 0;
        }));
      });
    });
  });
};

var addDepartmentCategoriesInfoToOrderMenuItemPrice = function addDepartmentCategoriesInfoToOrderMenuItemPrice(orderMenuItemPricesWithPricesInfo, levelTwoDepartmentCategories) {
  return orderMenuItemPricesWithPricesInfo.map(function (orderMenuItemPrice) {
    return orderMenuItemPrice.set('departmentCategoryIds', levelTwoDepartmentCategories.filter(function (departmentCategory) {
      return orderMenuItemPrice.getIn(['menuItemPrice', 'tagIds']).find(function (tagId) {
        return tagId.localeCompare(departmentCategory.getIn(['tag', 'id'])) === 0;
      });
    }).map(function (departmentCategory) {
      return departmentCategory.get('id');
    }));
  }).map(function (orderMenuItemPrice) {
    return orderMenuItemPrice.set('departmentCategoryId', orderMenuItemPrice.get('departmentCategoryIds').isEmpty() ? null : orderMenuItemPrice.get('departmentCategoryIds').first());
  });
};

var addTagInfoToDepartmentCategories = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(departmentCategories, _ref5) {
    var tagLoaderById = _ref5.tagLoaderById;
    var departmentCategoryTags;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return tagLoaderById.loadMany(departmentCategories.map(function (departmentCategory) {
              return departmentCategory.get('tagId');
            }).toArray());

          case 2:
            departmentCategoryTags = _context3.sent;
            return _context3.abrupt('return', departmentCategories.map(function (departmentCategory) {
              return departmentCategory.set('tag', departmentCategoryTags.find(function (tag) {
                return tag.get('id').localeCompare(departmentCategory.get('tagId')) === 0;
              }));
            }));

          case 4:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function addTagInfoToDepartmentCategories(_x6, _x7) {
    return _ref4.apply(this, arguments);
  };
}();

var getDepartmentCategoriesReport = exports.getDepartmentCategoriesReport = function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(searchArgs, _ref7, sessionToken) {
    var tagLoaderById = _ref7.tagLoaderById,
        menuItemPriceLoaderById = _ref7.menuItemPriceLoaderById,
        choiceItemPriceLoaderById = _ref7.choiceItemPriceLoaderById;

    var orderMenuItemPrices, ordersGroupedByPaymentGroup, eftposAndCashTotal, _ref8, menuItemPrices, choiceItemPrices, departmentCategories, departmentCategoriesWitTagInfo, levelOneDepartmentCategories, levelTwoDepartmentCategories, orderMenuItemPricesWithPricesInfo, orderMenuItemPricesWithDepartmentCategoryInfo, orderMenuItemPricesGroupedByDepartmentCategory, levelTwoReport, reportGroupedByParentDepartmentcategoryId, departmentCategoriesReport, totalSale, quantity;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return getAllPaidOrders(searchArgs, sessionToken);

          case 2:
            orderMenuItemPrices = _context4.sent;
            ordersGroupedByPaymentGroup = orderMenuItemPrices.groupBy(function (_) {
              return _.getIn(['paymentGroup', 'paymentGroupId']);
            });
            eftposAndCashTotal = ordersGroupedByPaymentGroup.reduce(function (reduction, orders) {
              return reduction.update('eftpos', function (currentValue) {
                var eftpos = orders.first().getIn(['paymentGroup', 'eftpos']);

                return _commonJavascript.Common.isNullOrUndefined ? currentValue : currentValue + eftpos;
              }).update('cash', function (currentValue) {
                var cash = orders.first().getIn(['paymentGroup', 'cash']);

                return _commonJavascript.Common.isNullOrUndefined ? currentValue : currentValue + cash;
              });
            }, (0, _immutable.Map)({ eftpos: 0.0, cash: 0.0 }));
            _context4.next = 7;
            return extractRequiredInfoFromOrderMenuItemPrices(orderMenuItemPrices, { menuItemPriceLoaderById: menuItemPriceLoaderById, choiceItemPriceLoaderById: choiceItemPriceLoaderById }, sessionToken);

          case 7:
            _ref8 = _context4.sent;
            menuItemPrices = _ref8.menuItemPrices;
            choiceItemPrices = _ref8.choiceItemPrices;
            departmentCategories = _ref8.departmentCategories;
            _context4.next = 13;
            return addTagInfoToDepartmentCategories(departmentCategories, { tagLoaderById: tagLoaderById });

          case 13:
            departmentCategoriesWitTagInfo = _context4.sent;
            levelOneDepartmentCategories = departmentCategoriesWitTagInfo.filter(function (departmentCategory) {
              return departmentCategory.getIn(['tag', 'level']) === 1;
            });
            levelTwoDepartmentCategories = departmentCategoriesWitTagInfo.filter(function (departmentCategory) {
              return departmentCategory.getIn(['tag', 'level']) === 2;
            });
            orderMenuItemPricesWithPricesInfo = addPriceInfoToOrderMenuItemPrice(orderMenuItemPrices, menuItemPrices, choiceItemPrices);
            orderMenuItemPricesWithDepartmentCategoryInfo = addDepartmentCategoriesInfoToOrderMenuItemPrice(orderMenuItemPricesWithPricesInfo, levelTwoDepartmentCategories);
            orderMenuItemPricesGroupedByDepartmentCategory = orderMenuItemPricesWithDepartmentCategoryInfo.groupBy(function (orderMenuItemPrice) {
              return orderMenuItemPrice.get('departmentCategoryId');
            });
            levelTwoReport = orderMenuItemPricesGroupedByDepartmentCategory.mapEntries(function (_ref9) {
              var _ref10 = _slicedToArray(_ref9, 2),
                  departmentCategoryId = _ref10[0],
                  orderMenuItemPrices = _ref10[1];

              var parentDepartmentCategoryTagId = departmentCategoryId ? levelTwoDepartmentCategories.find(function (departmentCategory) {
                return departmentCategory.get('id').localeCompare(departmentCategoryId) === 0;
              }).getIn(['tag', 'parentTagId']) : null;
              var parentDepartmentCategoryId = parentDepartmentCategoryTagId ? levelOneDepartmentCategories.find(function (departmentCategory) {
                return departmentCategory.getIn(['tag', 'id']).localeCompare(parentDepartmentCategoryTagId) === 0;
              }).get('id') : null;
              var report = orderMenuItemPrices.reduce(function (reduction, orderMenuItemPrice) {
                return reduction.update('totalSale', function (totalSale) {
                  var menuItemPriceTotalSale = totalSale;
                  var menuItemPriceCurrentPrice = orderMenuItemPrice.getIn(['menuItemPrice', 'currentPrice']);

                  if (menuItemPriceCurrentPrice) {
                    menuItemPriceTotalSale += menuItemPriceCurrentPrice;
                  }

                  menuItemPriceTotalSale += orderMenuItemPrice.get('orderChoiceItemPrices').reduce(function (total, orderChoiceItemPrice) {
                    var choiceItemPriceCurrentPrice = orderChoiceItemPrice.getIn(['choiceItemPrice', 'currentPrice']);

                    return choiceItemPriceCurrentPrice ? total + choiceItemPriceCurrentPrice : total;
                  }, 0.0);

                  return menuItemPriceTotalSale;
                });
              }, (0, _immutable.Map)({ parentDepartmentCategoryId: parentDepartmentCategoryId, departmentCategoryId: departmentCategoryId, quantity: orderMenuItemPrices.count(), totalSale: 0.0 }));

              return [departmentCategoryId, report];
            }).valueSeq().toList();
            reportGroupedByParentDepartmentcategoryId = levelTwoReport.groupBy(function (report) {
              return report.get('parentDepartmentCategoryId');
            });
            departmentCategoriesReport = reportGroupedByParentDepartmentcategoryId.keySeq().map(function (parentDepartmentCategoryId) {
              var subReport = reportGroupedByParentDepartmentcategoryId.get(parentDepartmentCategoryId);

              return (0, _immutable.Map)({ departmentCategoryId: parentDepartmentCategoryId }).merge(subReport.reduce(function (reduction, report) {
                return reduction.update('quantity', function (quantity) {
                  return quantity + report.get('quantity');
                }).update('totalSale', function (totalSale) {
                  return totalSale + report.get('totalSale');
                });
              }, (0, _immutable.Map)({ quantity: 0, totalSale: 0.0 }))).set('departmentSubCategoriesReport', subReport.map(function (report) {
                return (0, _immutable.Map)({ departmentCategoryId: report.get('departmentCategoryId'), quantity: report.get('quantity'), totalSale: report.get('totalSale') });
              }));
            });
            totalSale = departmentCategoriesReport.reduce(function (reduction, value) {
              return reduction + value.get('totalSale');
            }, 0);
            quantity = departmentCategoriesReport.reduce(function (reduction, value) {
              return reduction + value.get('quantity');
            }, 0);
            return _context4.abrupt('return', eftposAndCashTotal.merge((0, _immutable.Map)({ departmentCategoriesReport: departmentCategoriesReport, totalSale: totalSale, quantity: quantity })));

          case 25:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function getDepartmentCategoriesReport(_x8, _x9, _x10) {
    return _ref6.apply(this, arguments);
  };
}();

var DepartmentSubCategoryReport = new _graphql.GraphQLObjectType({
  name: 'DepartmentSubCategoryReport',
  fields: {
    departmentCategory: {
      type: (0, _graphql.GraphQLNonNull)(_DepartmentCategory2.default),
      resolve: function () {
        var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(_, args, _ref12) {
          var departmentCategoryLoaderById = _ref12.dataLoaders.departmentCategoryLoaderById;
          var departmentCategoryId;
          return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  departmentCategoryId = _.get('departmentCategoryId');

                  if (!departmentCategoryId) {
                    _context5.next = 5;
                    break;
                  }

                  _context5.next = 4;
                  return departmentCategoryLoaderById.load(departmentCategoryId);

                case 4:
                  return _context5.abrupt('return', _context5.sent);

                case 5:
                  return _context5.abrupt('return', (0, _immutable.Map)({ id: otherSubDepartmentCategoryId, tagId: _loaders.otherTagId }));

                case 6:
                case 'end':
                  return _context5.stop();
              }
            }
          }, _callee5, undefined);
        }));

        return function resolve(_x11, _x12, _x13) {
          return _ref11.apply(this, arguments);
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

var DepartmentCategoryReport = new _graphql.GraphQLObjectType({
  name: 'DepartmentCategoryReport',
  fields: {
    departmentCategory: {
      type: (0, _graphql.GraphQLNonNull)(_DepartmentCategory2.default),
      resolve: function () {
        var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(_, args, _ref14) {
          var departmentCategoryLoaderById = _ref14.dataLoaders.departmentCategoryLoaderById;
          var departmentCategoryId;
          return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  departmentCategoryId = _.get('departmentCategoryId');

                  if (!departmentCategoryId) {
                    _context6.next = 5;
                    break;
                  }

                  _context6.next = 4;
                  return departmentCategoryLoaderById.load(departmentCategoryId);

                case 4:
                  return _context6.abrupt('return', _context6.sent);

                case 5:
                  return _context6.abrupt('return', (0, _immutable.Map)({ id: otherDepartmentCategoryId, tagId: _loaders.otherTagId }));

                case 6:
                case 'end':
                  return _context6.stop();
              }
            }
          }, _callee6, undefined);
        }));

        return function resolve(_x14, _x15, _x16) {
          return _ref13.apply(this, arguments);
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

exports.default = new _graphql.GraphQLObjectType({
  name: 'DepartmentCategoryRootReport',
  fields: {
    departmentCategoriesReport: {
      type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(DepartmentCategoryReport)),
      resolve: function resolve(_) {
        return _.get('departmentCategoriesReport').toArray();
      }
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
    eftpos: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLFloat),
      resolve: function resolve(_) {
        return _.get('eftpos');
      }
    },
    cash: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLFloat),
      resolve: function resolve(_) {
        return _.get('cash');
      }
    }
  }
});