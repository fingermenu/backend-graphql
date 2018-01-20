'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSize = undefined;

var _graphql = require('graphql');

var _parseServerCommon = require('@fingermenu/parse-server-common');

var _interface = require('../interface');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var getSize = exports.getSize = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(sizeId, sessionToken) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', new _parseServerCommon.SizeService().read(sizeId, null, sessionToken));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getSize(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = new _graphql.GraphQLObjectType({
  name: 'Size',
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
    imageUrl: {
      type: _graphql.GraphQLString,
      resolve: function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_) {
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  return _context2.abrupt('return', _.get('imageUrl'));

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
    level: {
      type: _graphql.GraphQLInt,
      resolve: function () {
        var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_) {
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  return _context3.abrupt('return', _.get('level'));

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
    },
    forDisplay: {
      type: _graphql.GraphQLBoolean,
      resolve: function () {
        var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_) {
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  return _context4.abrupt('return', _.get('forDisplay'));

                case 1:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee4, undefined);
        }));

        return function resolve(_x5) {
          return _ref6.apply(this, arguments);
        };
      }()
    }
  },
  interfaces: [_interface.NodeInterface]
});