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

var _ChoiceItem = require('./ChoiceItem');

var _ChoiceItem2 = _interopRequireDefault(_ChoiceItem);

var _ChoiceItemConnection = require('./ChoiceItemConnection');

var _ChoiceItemConnection2 = _interopRequireDefault(_ChoiceItemConnection);

var _MenuItem = require('./MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _MenuItemConnection = require('./MenuItemConnection');

var _MenuItemConnection2 = _interopRequireDefault(_MenuItemConnection);

var _Restaurant = require('./Restaurant');

var _Restaurant2 = _interopRequireDefault(_Restaurant);

var _RestaurantConnection = require('./RestaurantConnection');

var _RestaurantConnection2 = _interopRequireDefault(_RestaurantConnection);

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
    choiceItem: {
      type: _ChoiceItem2.default,
      args: {
        choiceItemId: {
          type: new _graphql.GraphQLNonNull(_graphql.GraphQLID)
        }
      },
      resolve: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_, _ref2, _ref3) {
          var choiceItemId = _ref2.choiceItemId;
          var sessionToken = _ref3.sessionToken;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  return _context.abrupt('return', (0, _ChoiceItem.getChoiceItem)(choiceItemId, sessionToken));

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
    choiceItems: {
      type: _ChoiceItemConnection2.default.connectionType,
      args: _extends({}, _graphqlRelay.connectionArgs, {
        choiceItemIds: {
          type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(_graphql.GraphQLID))
        },
        name: {
          type: _graphql.GraphQLString
        },
        description: {
          type: _graphql.GraphQLString
        },
        sortOption: {
          type: _graphql.GraphQLString
        }
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
                  return _context2.abrupt('return', (0, _ChoiceItemConnection.getChoiceItems)(_immutable2.default.fromJS(args), dataLoaders, sessionToken, language));

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
    menuItem: {
      type: _MenuItem2.default,
      args: {
        menuItemId: {
          type: new _graphql.GraphQLNonNull(_graphql.GraphQLID)
        }
      },
      resolve: function () {
        var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_, _ref7, _ref8) {
          var menuItemId = _ref7.menuItemId;
          var sessionToken = _ref8.sessionToken;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  return _context3.abrupt('return', (0, _MenuItem.getMenuItem)(menuItemId, sessionToken));

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
    menuItems: {
      type: _MenuItemConnection2.default.connectionType,
      args: _extends({}, _graphqlRelay.connectionArgs, {
        menuItemIds: {
          type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(_graphql.GraphQLID))
        },
        name: {
          type: _graphql.GraphQLString
        },
        description: {
          type: _graphql.GraphQLString
        },
        sortOption: {
          type: _graphql.GraphQLString
        }
      }),
      resolve: function () {
        var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_, args, _ref10) {
          var sessionToken = _ref10.sessionToken;
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  return _context4.abrupt('return', (0, _MenuItemConnection.getMenuItems)(_immutable2.default.fromJS(args), sessionToken));

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
    restaurant: {
      type: _Restaurant2.default,
      args: {
        restaurantId: {
          type: new _graphql.GraphQLNonNull(_graphql.GraphQLID)
        }
      },
      resolve: function () {
        var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(_, _ref12, _ref13) {
          var restaurantId = _ref12.restaurantId;
          var sessionToken = _ref13.sessionToken;
          return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  return _context5.abrupt('return', (0, _Restaurant.getRestaurant)(restaurantId, sessionToken));

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
    restaurants: {
      type: _RestaurantConnection2.default.connectionType,
      args: _extends({}, _graphqlRelay.connectionArgs, {
        restaurantIds: {
          type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(_graphql.GraphQLID))
        },
        name: {
          type: _graphql.GraphQLString
        },
        status: {
          type: _graphql.GraphQLBoolean
        },
        inheritParentRestaurantMenus: {
          type: _graphql.GraphQLBoolean
        },
        sortOption: {
          type: _graphql.GraphQLString
        }
      }),
      resolve: function () {
        var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(_, args, _ref15) {
          var dataLoaders = _ref15.dataLoaders,
              sessionToken = _ref15.sessionToken,
              language = _ref15.language;
          return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  return _context6.abrupt('return', (0, _RestaurantConnection.getRestaurants)(_immutable2.default.fromJS(args), dataLoaders, sessionToken, language));

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
    }
  },
  interfaces: [_interface.NodeInterface]
});