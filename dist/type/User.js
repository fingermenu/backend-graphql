'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _interface = require('../interface');

var _Tag = require('./Tag');

var _Tag2 = _interopRequireDefault(_Tag);

var _TagConnection = require('./TagConnection');

var _TagConnection2 = _interopRequireDefault(_TagConnection);

var _ChoiceItem = require('./ChoiceItem');

var _ChoiceItem2 = _interopRequireDefault(_ChoiceItem);

var _ChoiceItemConnection = require('./ChoiceItemConnection');

var _ChoiceItemConnection2 = _interopRequireDefault(_ChoiceItemConnection);

var _ChoiceItemPrice = require('./ChoiceItemPrice');

var _ChoiceItemPrice2 = _interopRequireDefault(_ChoiceItemPrice);

var _ChoiceItemPriceConnection = require('./ChoiceItemPriceConnection');

var _ChoiceItemPriceConnection2 = _interopRequireDefault(_ChoiceItemPriceConnection);

var _MenuItem = require('./MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _MenuItemConnection = require('./MenuItemConnection');

var _MenuItemConnection2 = _interopRequireDefault(_MenuItemConnection);

var _MenuItemPrice = require('./MenuItemPrice');

var _MenuItemPrice2 = _interopRequireDefault(_MenuItemPrice);

var _MenuItemPriceConnection = require('./MenuItemPriceConnection');

var _MenuItemPriceConnection2 = _interopRequireDefault(_MenuItemPriceConnection);

var _Menu = require('./Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _MenuConnection = require('./MenuConnection');

var _MenuConnection2 = _interopRequireDefault(_MenuConnection);

var _Table = require('./Table');

var _Table2 = _interopRequireDefault(_Table);

var _TableConnection = require('./TableConnection');

var _TableConnection2 = _interopRequireDefault(_TableConnection);

var _Restaurant = require('./Restaurant');

var _Restaurant2 = _interopRequireDefault(_Restaurant);

var _RestaurantConnection = require('./RestaurantConnection');

var _RestaurantConnection2 = _interopRequireDefault(_RestaurantConnection);

var _Order = require('./Order');

var _Order2 = _interopRequireDefault(_Order);

var _OrderConnection = require('./OrderConnection');

var _OrderConnection2 = _interopRequireDefault(_OrderConnection);

var _DateTimeRange = require('./DateTimeRange');

var _DateTimeRange2 = _interopRequireDefault(_DateTimeRange);

var _ServingTime = require('./ServingTime');

var _ServingTime2 = _interopRequireDefault(_ServingTime);

var _ServingTimeConnection = require('./ServingTimeConnection');

var _ServingTimeConnection2 = _interopRequireDefault(_ServingTimeConnection);

var _DietaryOption = require('./DietaryOption');

var _DietaryOption2 = _interopRequireDefault(_DietaryOption);

var _DietaryOptionConnection = require('./DietaryOptionConnection');

var _DietaryOptionConnection2 = _interopRequireDefault(_DietaryOptionConnection);

var _UserFeedback = require('./UserFeedback');

var _UserFeedback2 = _interopRequireDefault(_UserFeedback);

var _UserFeedbackConnection = require('./UserFeedbackConnection');

var _UserFeedbackConnection2 = _interopRequireDefault(_UserFeedbackConnection);

var _Size = require('./Size');

var _Size2 = _interopRequireDefault(_Size);

var _SizeConnection = require('./SizeConnection');

var _SizeConnection2 = _interopRequireDefault(_SizeConnection);

var _DishType = require('./DishType');

var _DishType2 = _interopRequireDefault(_DishType);

var _DishTypeConnection = require('./DishTypeConnection');

var _DishTypeConnection2 = _interopRequireDefault(_DishTypeConnection);

var _DepartmentCategory = require('./DepartmentCategory');

var _DepartmentCategory2 = _interopRequireDefault(_DepartmentCategory);

var _DepartmentCategoryConnection = require('./DepartmentCategoryConnection');

var _DepartmentCategoryConnection2 = _interopRequireDefault(_DepartmentCategoryConnection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = new _graphql.GraphQLObjectType({
  name: 'User',
  fields: {
    id: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLID),
      resolve: function resolve(_) {
        return _.get('id');
      }
    },
    tag: {
      type: _Tag2.default,
      args: {
        tagId: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLID) }
      },
      resolve: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_, _ref2, _ref3) {
          var tagId = _ref2.tagId;
          var tagLoaderById = _ref3.dataLoaders.tagLoaderById;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  return _context.abrupt('return', tagId ? tagLoaderById.load(tagId) : null);

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
    tags: {
      type: _TagConnection2.default.connectionType,
      args: _extends({}, _graphqlRelay.connectionArgs, {
        tagIds: { type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(_graphql.GraphQLID)) },
        code: { type: _graphql.GraphQLString },
        name: { type: _graphql.GraphQLString },
        description: { type: _graphql.GraphQLString },
        level: { type: _graphql.GraphQLInt },
        forDisplay: { type: _graphql.GraphQLBoolean },
        sortOption: { type: _graphql.GraphQLString }
      }),
      resolve: function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_, args, _ref5) {
          var dataLoaders = _ref5.dataLoaders,
              sessionToken = _ref5.sessionToken,
              language = _ref5.language;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  return _context2.abrupt('return', (0, _TagConnection.getTags)(_immutable2.default.fromJS(args), dataLoaders, sessionToken, language));

                case 1:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, undefined);
        }));

        return function resolve(_x4, _x5, _x6) {
          return _ref4.apply(this, arguments);
        };
      }()
    },
    choiceItem: {
      type: _ChoiceItem2.default,
      args: {
        choiceItemId: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLID) }
      },
      resolve: function () {
        var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_, _ref7, _ref8) {
          var choiceItemId = _ref7.choiceItemId;
          var choiceItemLoaderById = _ref8.dataLoaders.choiceItemLoaderById;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  return _context3.abrupt('return', choiceItemId ? choiceItemLoaderById.load(choiceItemId) : null);

                case 1:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, undefined);
        }));

        return function resolve(_x7, _x8, _x9) {
          return _ref6.apply(this, arguments);
        };
      }()
    },
    choiceItems: {
      type: _ChoiceItemConnection2.default.connectionType,
      args: _extends({}, _graphqlRelay.connectionArgs, {
        choiceItemIds: { type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(_graphql.GraphQLID)) },
        name: { type: _graphql.GraphQLString },
        description: { type: _graphql.GraphQLString },
        sortOption: { type: _graphql.GraphQLString }
      }),
      resolve: function () {
        var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_, args, _ref10) {
          var dataLoaders = _ref10.dataLoaders,
              sessionToken = _ref10.sessionToken,
              language = _ref10.language;
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  return _context4.abrupt('return', (0, _ChoiceItemConnection.getChoiceItems)(_immutable2.default.fromJS(args), dataLoaders, sessionToken, language));

                case 1:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee4, undefined);
        }));

        return function resolve(_x10, _x11, _x12) {
          return _ref9.apply(this, arguments);
        };
      }()
    },
    choiceItemPrice: {
      type: _ChoiceItemPrice2.default,
      args: {
        choiceItemPriceId: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLID) }
      },
      resolve: function () {
        var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(_, _ref12, _ref13) {
          var choiceItemPriceId = _ref12.choiceItemPriceId;
          var choiceItemPriceLoaderById = _ref13.dataLoaders.choiceItemPriceLoaderById;
          return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  return _context5.abrupt('return', choiceItemPriceId ? choiceItemPriceLoaderById.load(choiceItemPriceId) : null);

                case 1:
                case 'end':
                  return _context5.stop();
              }
            }
          }, _callee5, undefined);
        }));

        return function resolve(_x13, _x14, _x15) {
          return _ref11.apply(this, arguments);
        };
      }()
    },
    choiceItemPrices: {
      type: _ChoiceItemPriceConnection2.default.connectionType,
      args: _extends({}, _graphqlRelay.connectionArgs, {
        choiceItemPriceIds: { type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(_graphql.GraphQLID)) },
        menuItemPriceId: { type: _graphql.GraphQLID },
        sortOption: { type: _graphql.GraphQLString }
      }),
      resolve: function () {
        var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(_, args, _ref15) {
          var dataLoaders = _ref15.dataLoaders,
              sessionToken = _ref15.sessionToken;
          return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  return _context6.abrupt('return', (0, _ChoiceItemPriceConnection.getChoiceItemPrices)(_immutable2.default.fromJS(args), dataLoaders, sessionToken));

                case 1:
                case 'end':
                  return _context6.stop();
              }
            }
          }, _callee6, undefined);
        }));

        return function resolve(_x16, _x17, _x18) {
          return _ref14.apply(this, arguments);
        };
      }()
    },
    menuItem: {
      type: _MenuItem2.default,
      args: {
        menuItemId: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLID) }
      },
      resolve: function () {
        var _ref16 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(_, _ref17, _ref18) {
          var menuItemId = _ref17.menuItemId;
          var menuItemLoaderById = _ref18.dataLoaders.menuItemLoaderById;
          return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  return _context7.abrupt('return', menuItemId ? menuItemLoaderById.load(menuItemId) : null);

                case 1:
                case 'end':
                  return _context7.stop();
              }
            }
          }, _callee7, undefined);
        }));

        return function resolve(_x19, _x20, _x21) {
          return _ref16.apply(this, arguments);
        };
      }()
    },
    menuItems: {
      type: _MenuItemConnection2.default.connectionType,
      args: _extends({}, _graphqlRelay.connectionArgs, {
        menuItemIds: { type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(_graphql.GraphQLID)) },
        name: { type: _graphql.GraphQLString },
        description: { type: _graphql.GraphQLString },
        sortOption: { type: _graphql.GraphQLString }
      }),
      resolve: function () {
        var _ref19 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(_, args, _ref20) {
          var dataLoaders = _ref20.dataLoaders,
              sessionToken = _ref20.sessionToken,
              language = _ref20.language;
          return regeneratorRuntime.wrap(function _callee8$(_context8) {
            while (1) {
              switch (_context8.prev = _context8.next) {
                case 0:
                  return _context8.abrupt('return', (0, _MenuItemConnection.getMenuItems)(_immutable2.default.fromJS(args), dataLoaders, sessionToken, language));

                case 1:
                case 'end':
                  return _context8.stop();
              }
            }
          }, _callee8, undefined);
        }));

        return function resolve(_x22, _x23, _x24) {
          return _ref19.apply(this, arguments);
        };
      }()
    },
    menuItemPrice: {
      type: _MenuItemPrice2.default,
      args: {
        menuItemPriceId: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLID) }
      },
      resolve: function () {
        var _ref21 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(_, _ref22, _ref23) {
          var menuItemPriceId = _ref22.menuItemPriceId;
          var menuItemPriceLoaderById = _ref23.dataLoaders.menuItemPriceLoaderById;
          return regeneratorRuntime.wrap(function _callee9$(_context9) {
            while (1) {
              switch (_context9.prev = _context9.next) {
                case 0:
                  return _context9.abrupt('return', menuItemPriceId ? menuItemPriceLoaderById.load(menuItemPriceId) : null);

                case 1:
                case 'end':
                  return _context9.stop();
              }
            }
          }, _callee9, undefined);
        }));

        return function resolve(_x25, _x26, _x27) {
          return _ref21.apply(this, arguments);
        };
      }()
    },
    menuItemPrices: {
      type: _MenuItemPriceConnection2.default.connectionType,
      args: _extends({}, _graphqlRelay.connectionArgs, {
        menuItemPriceIds: { type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(_graphql.GraphQLID)) },
        menuId: { type: _graphql.GraphQLID },
        sortOption: { type: _graphql.GraphQLString }
      }),
      resolve: function () {
        var _ref24 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(_, args, _ref25) {
          var dataLoaders = _ref25.dataLoaders,
              sessionToken = _ref25.sessionToken;
          return regeneratorRuntime.wrap(function _callee10$(_context10) {
            while (1) {
              switch (_context10.prev = _context10.next) {
                case 0:
                  return _context10.abrupt('return', (0, _MenuItemPriceConnection.getMenuItemPrices)(_immutable2.default.fromJS(args), dataLoaders, sessionToken));

                case 1:
                case 'end':
                  return _context10.stop();
              }
            }
          }, _callee10, undefined);
        }));

        return function resolve(_x28, _x29, _x30) {
          return _ref24.apply(this, arguments);
        };
      }()
    },
    menu: {
      type: _Menu2.default,
      args: {
        menuId: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLID) }
      },
      resolve: function () {
        var _ref26 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(_, _ref27, _ref28) {
          var menuId = _ref27.menuId;
          var menuLoaderById = _ref28.dataLoaders.menuLoaderById;
          return regeneratorRuntime.wrap(function _callee11$(_context11) {
            while (1) {
              switch (_context11.prev = _context11.next) {
                case 0:
                  return _context11.abrupt('return', menuId ? menuLoaderById.load(menuId) : null);

                case 1:
                case 'end':
                  return _context11.stop();
              }
            }
          }, _callee11, undefined);
        }));

        return function resolve(_x31, _x32, _x33) {
          return _ref26.apply(this, arguments);
        };
      }()
    },
    menus: {
      type: _MenuConnection2.default.connectionType,
      args: _extends({}, _graphqlRelay.connectionArgs, {
        menuIds: { type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(_graphql.GraphQLID)) },
        restaurantId: { type: _graphql.GraphQLID },
        name: { type: _graphql.GraphQLString },
        description: { type: _graphql.GraphQLString },
        sortOption: { type: _graphql.GraphQLString }
      }),
      resolve: function () {
        var _ref29 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(_, args, _ref30) {
          var dataLoaders = _ref30.dataLoaders,
              sessionToken = _ref30.sessionToken,
              language = _ref30.language;
          return regeneratorRuntime.wrap(function _callee12$(_context12) {
            while (1) {
              switch (_context12.prev = _context12.next) {
                case 0:
                  return _context12.abrupt('return', (0, _MenuConnection.getMenus)(_immutable2.default.fromJS(args), dataLoaders, sessionToken, language));

                case 1:
                case 'end':
                  return _context12.stop();
              }
            }
          }, _callee12, undefined);
        }));

        return function resolve(_x34, _x35, _x36) {
          return _ref29.apply(this, arguments);
        };
      }()
    },
    table: {
      type: _Table2.default,
      args: {
        tableId: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLID) }
      },
      resolve: function () {
        var _ref31 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(_, _ref32, _ref33) {
          var tableId = _ref32.tableId;
          var tableLoaderById = _ref33.dataLoaders.tableLoaderById;
          return regeneratorRuntime.wrap(function _callee13$(_context13) {
            while (1) {
              switch (_context13.prev = _context13.next) {
                case 0:
                  return _context13.abrupt('return', tableId ? tableLoaderById.load(tableId) : null);

                case 1:
                case 'end':
                  return _context13.stop();
              }
            }
          }, _callee13, undefined);
        }));

        return function resolve(_x37, _x38, _x39) {
          return _ref31.apply(this, arguments);
        };
      }()
    },
    tables: {
      type: _TableConnection2.default.connectionType,
      args: _extends({}, _graphqlRelay.connectionArgs, {
        tableIds: { type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(_graphql.GraphQLID)) },
        restaurantId: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLID) },
        lastOrderCorrelationId: { type: _graphql.GraphQLID },
        name: { type: _graphql.GraphQLString },
        notes: { type: _graphql.GraphQLString },
        tableState: { type: _graphql.GraphQLString },
        sortOption: { type: _graphql.GraphQLString }
      }),
      resolve: function () {
        var _ref34 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(_, args, _ref35) {
          var dataLoaders = _ref35.dataLoaders,
              sessionToken = _ref35.sessionToken,
              language = _ref35.language;
          return regeneratorRuntime.wrap(function _callee14$(_context14) {
            while (1) {
              switch (_context14.prev = _context14.next) {
                case 0:
                  return _context14.abrupt('return', (0, _TableConnection.getTables)(_immutable2.default.fromJS(args), dataLoaders, sessionToken, language));

                case 1:
                case 'end':
                  return _context14.stop();
              }
            }
          }, _callee14, undefined);
        }));

        return function resolve(_x40, _x41, _x42) {
          return _ref34.apply(this, arguments);
        };
      }()
    },
    restaurant: {
      type: _Restaurant2.default,
      args: {
        restaurantId: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLID) }
      },
      resolve: function () {
        var _ref36 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(_, _ref37, _ref38) {
          var restaurantId = _ref37.restaurantId;
          var restaurantLoaderById = _ref38.dataLoaders.restaurantLoaderById;
          return regeneratorRuntime.wrap(function _callee15$(_context15) {
            while (1) {
              switch (_context15.prev = _context15.next) {
                case 0:
                  return _context15.abrupt('return', restaurantId ? restaurantLoaderById.load(restaurantId) : null);

                case 1:
                case 'end':
                  return _context15.stop();
              }
            }
          }, _callee15, undefined);
        }));

        return function resolve(_x43, _x44, _x45) {
          return _ref36.apply(this, arguments);
        };
      }()
    },
    restaurants: {
      type: _RestaurantConnection2.default.connectionType,
      args: _extends({}, _graphqlRelay.connectionArgs, {
        restaurantIds: { type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(_graphql.GraphQLID)) },
        name: { type: _graphql.GraphQLString },
        status: { type: _graphql.GraphQLBoolean },
        inheritParentRestaurantMenus: { type: _graphql.GraphQLBoolean },
        sortOption: { type: _graphql.GraphQLString }
      }),
      resolve: function () {
        var _ref39 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(_, args, _ref40) {
          var dataLoaders = _ref40.dataLoaders,
              sessionToken = _ref40.sessionToken,
              language = _ref40.language;
          return regeneratorRuntime.wrap(function _callee16$(_context16) {
            while (1) {
              switch (_context16.prev = _context16.next) {
                case 0:
                  return _context16.abrupt('return', (0, _RestaurantConnection.getRestaurants)(_immutable2.default.fromJS(args), dataLoaders, sessionToken, language));

                case 1:
                case 'end':
                  return _context16.stop();
              }
            }
          }, _callee16, undefined);
        }));

        return function resolve(_x46, _x47, _x48) {
          return _ref39.apply(this, arguments);
        };
      }()
    },
    order: {
      type: _Order2.default,
      args: {
        orderId: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLID) }
      },
      resolve: function () {
        var _ref41 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17(_, _ref42, _ref43) {
          var orderId = _ref42.orderId;
          var sessionToken = _ref43.sessionToken;
          return regeneratorRuntime.wrap(function _callee17$(_context17) {
            while (1) {
              switch (_context17.prev = _context17.next) {
                case 0:
                  return _context17.abrupt('return', (0, _Order.getOrder)(orderId, sessionToken));

                case 1:
                case 'end':
                  return _context17.stop();
              }
            }
          }, _callee17, undefined);
        }));

        return function resolve(_x49, _x50, _x51) {
          return _ref41.apply(this, arguments);
        };
      }()
    },
    orders: {
      type: _OrderConnection2.default.connectionType,
      args: _extends({}, _graphqlRelay.connectionArgs, {
        orderIds: { type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(_graphql.GraphQLID)) },
        correlationId: { type: _graphql.GraphQLID },
        restaurantId: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLID) },
        dateTimeRange: { type: _DateTimeRange2.default },
        includeCancelledOrders: { type: _graphql.GraphQLBoolean },
        tableId: { type: _graphql.GraphQLID },
        name: { type: _graphql.GraphQLString },
        notes: { type: _graphql.GraphQLString },
        sortOption: { type: _graphql.GraphQLString }
      }),
      resolve: function () {
        var _ref44 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18(_, args, _ref45) {
          var sessionToken = _ref45.sessionToken;
          return regeneratorRuntime.wrap(function _callee18$(_context18) {
            while (1) {
              switch (_context18.prev = _context18.next) {
                case 0:
                  return _context18.abrupt('return', (0, _OrderConnection.getOrders)(_immutable2.default.fromJS(args), sessionToken));

                case 1:
                case 'end':
                  return _context18.stop();
              }
            }
          }, _callee18, undefined);
        }));

        return function resolve(_x52, _x53, _x54) {
          return _ref44.apply(this, arguments);
        };
      }()
    },
    servingTime: {
      type: _ServingTime2.default,
      args: {
        servingTimeId: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLID) }
      },
      resolve: function () {
        var _ref46 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee19(_, _ref47, _ref48) {
          var servingTimeId = _ref47.servingTimeId;
          var servingTimeLoaderById = _ref48.dataLoaders.servingTimeLoaderById;
          return regeneratorRuntime.wrap(function _callee19$(_context19) {
            while (1) {
              switch (_context19.prev = _context19.next) {
                case 0:
                  return _context19.abrupt('return', servingTimeId ? servingTimeLoaderById.load(servingTimeId) : null);

                case 1:
                case 'end':
                  return _context19.stop();
              }
            }
          }, _callee19, undefined);
        }));

        return function resolve(_x55, _x56, _x57) {
          return _ref46.apply(this, arguments);
        };
      }()
    },
    servingTimes: {
      type: _ServingTimeConnection2.default.connectionType,
      args: _extends({}, _graphqlRelay.connectionArgs, {
        servingTimeIds: { type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(_graphql.GraphQLID)) },
        sortOption: { type: _graphql.GraphQLString }
      }),
      resolve: function () {
        var _ref49 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee20(_, args, _ref50) {
          var dataLoaders = _ref50.dataLoaders,
              sessionToken = _ref50.sessionToken;
          return regeneratorRuntime.wrap(function _callee20$(_context20) {
            while (1) {
              switch (_context20.prev = _context20.next) {
                case 0:
                  return _context20.abrupt('return', (0, _ServingTimeConnection.getServingTimes)(_immutable2.default.fromJS(args), dataLoaders, sessionToken));

                case 1:
                case 'end':
                  return _context20.stop();
              }
            }
          }, _callee20, undefined);
        }));

        return function resolve(_x58, _x59, _x60) {
          return _ref49.apply(this, arguments);
        };
      }()
    },
    dietaryOption: {
      type: _DietaryOption2.default,
      args: {
        dietaryOptionId: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLID) }
      },
      resolve: function () {
        var _ref51 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee21(_, _ref52, _ref53) {
          var dietaryOptionId = _ref52.dietaryOptionId;
          var dietaryOptionLoaderById = _ref53.dataLoaders.dietaryOptionLoaderById;
          return regeneratorRuntime.wrap(function _callee21$(_context21) {
            while (1) {
              switch (_context21.prev = _context21.next) {
                case 0:
                  return _context21.abrupt('return', dietaryOptionId ? dietaryOptionLoaderById.load(dietaryOptionId) : null);

                case 1:
                case 'end':
                  return _context21.stop();
              }
            }
          }, _callee21, undefined);
        }));

        return function resolve(_x61, _x62, _x63) {
          return _ref51.apply(this, arguments);
        };
      }()
    },
    dietaryOptions: {
      type: _DietaryOptionConnection2.default.connectionType,
      args: _extends({}, _graphqlRelay.connectionArgs, {
        dietaryOptionIds: { type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(_graphql.GraphQLID)) },
        sortOption: { type: _graphql.GraphQLString }
      }),
      resolve: function () {
        var _ref54 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee22(_, args, _ref55) {
          var dataLoaders = _ref55.dataLoaders,
              sessionToken = _ref55.sessionToken;
          return regeneratorRuntime.wrap(function _callee22$(_context22) {
            while (1) {
              switch (_context22.prev = _context22.next) {
                case 0:
                  return _context22.abrupt('return', (0, _DietaryOptionConnection.getDietaryOptions)(_immutable2.default.fromJS(args), dataLoaders, sessionToken));

                case 1:
                case 'end':
                  return _context22.stop();
              }
            }
          }, _callee22, undefined);
        }));

        return function resolve(_x64, _x65, _x66) {
          return _ref54.apply(this, arguments);
        };
      }()
    },
    userFeedback: {
      type: _UserFeedback2.default,
      args: {
        userFeedbackId: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLID) }
      },
      resolve: function () {
        var _ref56 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee23(_, _ref57, _ref58) {
          var userFeedbackId = _ref57.userFeedbackId;
          var userFeedbackLoaderById = _ref58.dataLoaders.userFeedbackLoaderById;
          return regeneratorRuntime.wrap(function _callee23$(_context23) {
            while (1) {
              switch (_context23.prev = _context23.next) {
                case 0:
                  return _context23.abrupt('return', userFeedbackId ? userFeedbackLoaderById.load(userFeedbackId) : null);

                case 1:
                case 'end':
                  return _context23.stop();
              }
            }
          }, _callee23, undefined);
        }));

        return function resolve(_x67, _x68, _x69) {
          return _ref56.apply(this, arguments);
        };
      }()
    },
    userFeedbacks: {
      type: _UserFeedbackConnection2.default.connectionType,
      args: _extends({}, _graphqlRelay.connectionArgs, {
        userFeedbackIds: { type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(_graphql.GraphQLID)) },
        others: { type: _graphql.GraphQLString },
        dateTimeRange: { type: _DateTimeRange2.default },
        sortOption: { type: _graphql.GraphQLString }
      }),
      resolve: function () {
        var _ref59 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee24(_, args, _ref60) {
          var dataLoaders = _ref60.dataLoaders,
              sessionToken = _ref60.sessionToken;
          return regeneratorRuntime.wrap(function _callee24$(_context24) {
            while (1) {
              switch (_context24.prev = _context24.next) {
                case 0:
                  return _context24.abrupt('return', (0, _UserFeedbackConnection.getUserFeedbacks)(_immutable2.default.fromJS(args), dataLoaders, sessionToken));

                case 1:
                case 'end':
                  return _context24.stop();
              }
            }
          }, _callee24, undefined);
        }));

        return function resolve(_x70, _x71, _x72) {
          return _ref59.apply(this, arguments);
        };
      }()
    },
    size: {
      type: _Size2.default,
      args: {
        sizeId: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLID) }
      },
      resolve: function () {
        var _ref61 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee25(_, _ref62, _ref63) {
          var sizeId = _ref62.sizeId;
          var sizeLoaderById = _ref63.dataLoaders.sizeLoaderById;
          return regeneratorRuntime.wrap(function _callee25$(_context25) {
            while (1) {
              switch (_context25.prev = _context25.next) {
                case 0:
                  return _context25.abrupt('return', sizeId ? sizeLoaderById.load(sizeId) : null);

                case 1:
                case 'end':
                  return _context25.stop();
              }
            }
          }, _callee25, undefined);
        }));

        return function resolve(_x73, _x74, _x75) {
          return _ref61.apply(this, arguments);
        };
      }()
    },
    sizes: {
      type: _SizeConnection2.default.connectionType,
      args: _extends({}, _graphqlRelay.connectionArgs, {
        sizeIds: { type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(_graphql.GraphQLID)) },
        sortOption: { type: _graphql.GraphQLString }
      }),
      resolve: function () {
        var _ref64 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee26(_, args, _ref65) {
          var dataLoaders = _ref65.dataLoaders,
              sessionToken = _ref65.sessionToken;
          return regeneratorRuntime.wrap(function _callee26$(_context26) {
            while (1) {
              switch (_context26.prev = _context26.next) {
                case 0:
                  return _context26.abrupt('return', (0, _SizeConnection.getSizes)(_immutable2.default.fromJS(args), dataLoaders, sessionToken));

                case 1:
                case 'end':
                  return _context26.stop();
              }
            }
          }, _callee26, undefined);
        }));

        return function resolve(_x76, _x77, _x78) {
          return _ref64.apply(this, arguments);
        };
      }()
    },
    dishType: {
      type: _DishType2.default,
      args: {
        dishTypeId: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLID) }
      },
      resolve: function () {
        var _ref66 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee27(_, _ref67, _ref68) {
          var dishTypeId = _ref67.dishTypeId;
          var dishTypeLoaderById = _ref68.dataLoaders.dishTypeLoaderById;
          return regeneratorRuntime.wrap(function _callee27$(_context27) {
            while (1) {
              switch (_context27.prev = _context27.next) {
                case 0:
                  return _context27.abrupt('return', dishTypeId ? dishTypeLoaderById.load(dishTypeId) : null);

                case 1:
                case 'end':
                  return _context27.stop();
              }
            }
          }, _callee27, undefined);
        }));

        return function resolve(_x79, _x80, _x81) {
          return _ref66.apply(this, arguments);
        };
      }()
    },
    dishTypes: {
      type: _DishTypeConnection2.default.connectionType,
      args: _extends({}, _graphqlRelay.connectionArgs, {
        dishTypeIds: { type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(_graphql.GraphQLID)) },
        sortOption: { type: _graphql.GraphQLString }
      }),
      resolve: function () {
        var _ref69 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee28(_, args, _ref70) {
          var dataLoaders = _ref70.dataLoaders,
              sessionToken = _ref70.sessionToken;
          return regeneratorRuntime.wrap(function _callee28$(_context28) {
            while (1) {
              switch (_context28.prev = _context28.next) {
                case 0:
                  return _context28.abrupt('return', (0, _DishTypeConnection.getDishTypes)(_immutable2.default.fromJS(args), dataLoaders, sessionToken));

                case 1:
                case 'end':
                  return _context28.stop();
              }
            }
          }, _callee28, undefined);
        }));

        return function resolve(_x82, _x83, _x84) {
          return _ref69.apply(this, arguments);
        };
      }()
    },
    departmentCategory: {
      type: _DepartmentCategory2.default,
      args: {
        departmentCategoryId: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLID) }
      },
      resolve: function () {
        var _ref71 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee29(_, _ref72, _ref73) {
          var departmentCategoryId = _ref72.departmentCategoryId;
          var departmentCategoryLoaderById = _ref73.dataLoaders.departmentCategoryLoaderById;
          return regeneratorRuntime.wrap(function _callee29$(_context29) {
            while (1) {
              switch (_context29.prev = _context29.next) {
                case 0:
                  return _context29.abrupt('return', departmentCategoryId ? departmentCategoryLoaderById.load(departmentCategoryId) : null);

                case 1:
                case 'end':
                  return _context29.stop();
              }
            }
          }, _callee29, undefined);
        }));

        return function resolve(_x85, _x86, _x87) {
          return _ref71.apply(this, arguments);
        };
      }()
    },
    departmentCategorys: {
      type: _DepartmentCategoryConnection2.default.connectionType,
      args: _extends({}, _graphqlRelay.connectionArgs, {
        departmentCategoryIds: { type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(_graphql.GraphQLID)) },
        sortOption: { type: _graphql.GraphQLString }
      }),
      resolve: function () {
        var _ref74 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee30(_, args, _ref75) {
          var dataLoaders = _ref75.dataLoaders,
              sessionToken = _ref75.sessionToken;
          return regeneratorRuntime.wrap(function _callee30$(_context30) {
            while (1) {
              switch (_context30.prev = _context30.next) {
                case 0:
                  return _context30.abrupt('return', (0, _DepartmentCategoryConnection.getDepartmentCategorys)(_immutable2.default.fromJS(args), dataLoaders, sessionToken));

                case 1:
                case 'end':
                  return _context30.stop();
              }
            }
          }, _callee30, undefined);
        }));

        return function resolve(_x88, _x89, _x90) {
          return _ref74.apply(this, arguments);
        };
      }()
    }
  },
  interfaces: [_interface.NodeInterface]
});