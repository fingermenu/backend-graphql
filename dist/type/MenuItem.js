'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMenuItem = undefined;

var _graphql = require('graphql');

var _parseServerCommon = require('@fingermenu/parse-server-common');

var _interface = require('../interface');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var getMenuItem = exports.getMenuItem = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(menuItemId, sessionToken) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', new _parseServerCommon.MenuItemService().read(menuItemId, null, sessionToken));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getMenuItem(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = new _graphql.GraphQLObjectType({
  name: 'MenuItem',
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
    description: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_, args, _ref3) {
        var language = _ref3.language;

        var allValues = _.get('description');

        return allValues ? allValues.get(language + '_description') : null;
      }
    },
    menuItemPageUrl: {
      type: _graphql.GraphQLString,
      resolve: function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_) {
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  return _context2.abrupt('return', _.get('menuItemPageUrl'));

                case 1:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, undefined);
        }));

        return function resolve(_x3) {
          return _ref4.apply(this, arguments);
        };
      }()
    },
    imageUrl: {
      type: _graphql.GraphQLString,
      resolve: function () {
        var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_) {
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  return _context3.abrupt('return', _.get('imageUrl'));

                case 1:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, undefined);
        }));

        return function resolve(_x4) {
          return _ref5.apply(this, arguments);
        };
      }()
    }
  },
  interfaces: [_interface.NodeInterface]
});