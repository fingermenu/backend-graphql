'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTable = undefined;

var _parseServerCommon = require('@fingermenu/parse-server-common');

var _graphql = require('graphql');

var _interface = require('../interface');

var _TableState = require('./TableState');

var _TableState2 = _interopRequireDefault(_TableState);

var _Common = require('./Common');

var _Common2 = _interopRequireDefault(_Common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var getTable = exports.getTable = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(tableId, sessionToken) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', new _parseServerCommon.TableService().read(tableId, null, sessionToken));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getTable(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = new _graphql.GraphQLObjectType({
  name: 'Table',
  fields: {
    id: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLID),
      resolve: function resolve(_) {
        return _.get('id');
      }
    },
    name: {
      type: _graphql.GraphQLString,
      resolve: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_, args, _ref3) {
          var language = _ref3.language,
              configLoader = _ref3.dataLoaders.configLoader;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  return _context2.abrupt('return', _Common2.default.getTranslation(_, 'name', language, configLoader));

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
    nameToPrint: {
      type: _graphql.GraphQLString,
      resolve: function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_, args, _ref5) {
          var configLoader = _ref5.dataLoaders.configLoader;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  return _context3.abrupt('return', _Common2.default.getTranslationToPrint(_, 'name', configLoader));

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
    status: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('status');
      }
    },
    numberOfAdults: {
      type: _graphql.GraphQLInt,
      resolve: function resolve(_) {
        return _.get('numberOfAdults');
      }
    },
    numberOfChildren: {
      type: _graphql.GraphQLInt,
      resolve: function resolve(_) {
        return _.get('numberOfChildren');
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
    sortOrderIndex: {
      type: _graphql.GraphQLInt,
      resolve: function resolve(_) {
        return _.get('sortOrderIndex');
      }
    },
    lastOrderCorelationId: {
      type: _graphql.GraphQLID,
      resolve: function resolve(_) {
        return _.get('lastOrderCorelationId');
      }
    },
    tableState: {
      type: _TableState2.default,
      resolve: function () {
        var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_, args, _ref7) {
          var tableStateLoaderById = _ref7.dataLoaders.tableStateLoaderById;
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  return _context4.abrupt('return', _.get('tableStateId') ? tableStateLoaderById.load(_.get('tableStateId')) : null);

                case 1:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee4, undefined);
        }));

        return function resolve(_x9, _x10, _x11) {
          return _ref6.apply(this, arguments);
        };
      }()
    }
  },
  interfaces: [_interface.NodeInterface]
});