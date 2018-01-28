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

var _Language = require('./Language');

var _Language2 = _interopRequireDefault(_Language);

var _LanguageConnection = require('./LanguageConnection');

var _LanguageConnection2 = _interopRequireDefault(_LanguageConnection);

var _OrderState = require('./OrderState');

var _OrderState2 = _interopRequireDefault(_OrderState);

var _OrderStateConnection = require('./OrderStateConnection');

var _OrderStateConnection2 = _interopRequireDefault(_OrderStateConnection);

var _TableState = require('./TableState');

var _TableState2 = _interopRequireDefault(_TableState);

var _TableStateConnection = require('./TableStateConnection');

var _TableStateConnection2 = _interopRequireDefault(_TableStateConnection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = new _graphql.GraphQLObjectType({
  name: 'Viewer',
  fields: {
    id: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLID),
      resolve: function resolve(_) {
        return _.get('id');
      }
    },
    language: {
      type: _Language2.default,
      args: {
        languageId: {
          type: new _graphql.GraphQLNonNull(_graphql.GraphQLID)
        }
      },
      resolve: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_, _ref2) {
          var languageId = _ref2.languageId;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  return _context.abrupt('return', (0, _Language.getLanguage)(languageId));

                case 1:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, undefined);
        }));

        return function resolve(_x, _x2) {
          return _ref.apply(this, arguments);
        };
      }()
    },
    languages: {
      type: _LanguageConnection2.default.connectionType,
      args: _extends({}, _graphqlRelay.connectionArgs, {
        languageIds: {
          type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(_graphql.GraphQLID))
        },
        key: {
          type: _graphql.GraphQLString
        },
        name: {
          type: _graphql.GraphQLString
        },
        sortOption: {
          type: _graphql.GraphQLString
        }
      }),
      resolve: function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_, args, _ref4) {
          var sessionToken = _ref4.sessionToken;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  return _context2.abrupt('return', (0, _LanguageConnection.getLanguages)(_immutable2.default.fromJS(args), sessionToken));

                case 1:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, undefined);
        }));

        return function resolve(_x3, _x4, _x5) {
          return _ref3.apply(this, arguments);
        };
      }()
    },
    orderState: {
      type: _OrderState2.default,
      args: {
        orderStateId: {
          type: new _graphql.GraphQLNonNull(_graphql.GraphQLID)
        }
      },
      resolve: function () {
        var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_, _ref6) {
          var orderStateId = _ref6.orderStateId;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  return _context3.abrupt('return', (0, _OrderState.getOrderState)(orderStateId));

                case 1:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, undefined);
        }));

        return function resolve(_x6, _x7) {
          return _ref5.apply(this, arguments);
        };
      }()
    },
    orderStates: {
      type: _OrderStateConnection2.default.connectionType,
      args: _extends({}, _graphqlRelay.connectionArgs, {
        orderStateIds: {
          type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(_graphql.GraphQLID))
        },
        key: {
          type: _graphql.GraphQLString
        },
        name: {
          type: _graphql.GraphQLString
        },
        sortOption: {
          type: _graphql.GraphQLString
        }
      }),
      resolve: function () {
        var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_, args, _ref8) {
          var sessionToken = _ref8.sessionToken,
              language = _ref8.language;
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  return _context4.abrupt('return', (0, _OrderStateConnection.getOrderStates)(_immutable2.default.fromJS(args), sessionToken, language));

                case 1:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee4, undefined);
        }));

        return function resolve(_x8, _x9, _x10) {
          return _ref7.apply(this, arguments);
        };
      }()
    },
    tableState: {
      type: _TableState2.default,
      args: {
        tableStateId: {
          type: new _graphql.GraphQLNonNull(_graphql.GraphQLID)
        }
      },
      resolve: function () {
        var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(_, _ref10) {
          var tableStateId = _ref10.tableStateId;
          return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  return _context5.abrupt('return', (0, _TableState.getTableState)(tableStateId));

                case 1:
                case 'end':
                  return _context5.stop();
              }
            }
          }, _callee5, undefined);
        }));

        return function resolve(_x11, _x12) {
          return _ref9.apply(this, arguments);
        };
      }()
    },
    tableStates: {
      type: _TableStateConnection2.default.connectionType,
      args: _extends({}, _graphqlRelay.connectionArgs, {
        tableStateIds: {
          type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(_graphql.GraphQLID))
        },
        key: {
          type: _graphql.GraphQLString
        },
        name: {
          type: _graphql.GraphQLString
        },
        sortOption: {
          type: _graphql.GraphQLString
        }
      }),
      resolve: function () {
        var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(_, args, _ref12) {
          var sessionToken = _ref12.sessionToken,
              language = _ref12.language;
          return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  return _context6.abrupt('return', (0, _TableStateConnection.getTableStates)(_immutable2.default.fromJS(args), sessionToken, language));

                case 1:
                case 'end':
                  return _context6.stop();
              }
            }
          }, _callee6, undefined);
        }));

        return function resolve(_x13, _x14, _x15) {
          return _ref11.apply(this, arguments);
        };
      }()
    }
  },
  interfaces: [_interface.NodeInterface]
});