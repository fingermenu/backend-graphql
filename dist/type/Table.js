'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTable = undefined;

var _graphql = require('graphql');

var _parseServerCommon = require('@fingermenu/parse-server-common');

var _interface = require('../interface');

var _TableState = require('./TableState');

var _TableState2 = _interopRequireDefault(_TableState);

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
      resolve: function resolve(_, args, _ref2) {
        var language = _ref2.language;

        var allValues = _.get('name');

        return allValues ? allValues.get(language + '_name') : null;
      }
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
    tableState: {
      type: _TableState2.default,
      resolve: function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_, args, _ref4) {
          var dataLoaders = _ref4.dataLoaders;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  return _context2.abrupt('return', dataLoaders.tableStateLoaderById.load(_.get('tableStateId')));

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
    }
  },
  interfaces: [_interface.NodeInterface]
});