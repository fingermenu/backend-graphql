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

var _ChoiceItemConnection = require('./ChoiceItemConnection');

var _ChoiceItemConnection2 = _interopRequireDefault(_ChoiceItemConnection);

var _MenuItemConnection = require('./MenuItemConnection');

var _MenuItemConnection2 = _interopRequireDefault(_MenuItemConnection);

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
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_, args, _ref2) {
          var dataLoaders = _ref2.dataLoaders,
              sessionToken = _ref2.sessionToken,
              language = _ref2.language;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  return _context.abrupt('return', (0, _ChoiceItemConnection.getChoiceItems)(_immutable2.default.fromJS(args), dataLoaders, sessionToken, language));

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
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_, args, _ref4) {
          var dataLoaders = _ref4.dataLoaders,
              sessionToken = _ref4.sessionToken,
              language = _ref4.language;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  return _context2.abrupt('return', (0, _MenuItemConnection.getMenuItems)(_immutable2.default.fromJS(args), dataLoaders, sessionToken, language));

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
        var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_, args, _ref6) {
          var dataLoaders = _ref6.dataLoaders,
              sessionToken = _ref6.sessionToken,
              language = _ref6.language;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  return _context3.abrupt('return', (0, _RestaurantConnection.getRestaurants)(_immutable2.default.fromJS(args), dataLoaders, sessionToken, language));

                case 1:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, undefined);
        }));

        return function resolve(_x7, _x8, _x9) {
          return _ref5.apply(this, arguments);
        };
      }()
    }
  },
  interfaces: [_interface.NodeInterface]
});