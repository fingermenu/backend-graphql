'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _interface = require('../interface');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = new _graphql.GraphQLObjectType({
  name: 'ChoiceItem',
  fields: {
    id: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLID),
      resolve: function resolve(_) {
        return _.get('id');
      }
    },
    name: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('name');
      }
    },
    description: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('description');
      }
    },
    menuItemPageUrl: {
      type: _graphql.GraphQLString,
      resolve: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_) {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  return _context.abrupt('return', _.get('menuItemPageUrl'));

                case 1:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, undefined);
        }));

        return function resolve(_x) {
          return _ref.apply(this, arguments);
        };
      }()
    },
    imageUrl: {
      type: _graphql.GraphQLString,
      resolve: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_) {
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

        return function resolve(_x2) {
          return _ref2.apply(this, arguments);
        };
      }()
    }
  },
  interfaces: [_interface.NodeInterface]
});