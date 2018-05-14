'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _graphql = require('graphql');

var _Viewer = require('./Viewer');

var _Viewer2 = _interopRequireDefault(_Viewer);

var _User = require('./User');

var _User2 = _interopRequireDefault(_User);

var _interface = require('../interface');

var _mutation = require('../mutation');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = new _graphql.GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: _User2.default,
      resolve: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_, args, _ref2) {
          var sessionToken = _ref2.sessionToken,
              dataLoaders = _ref2.dataLoaders,
              fingerMenuContext = _ref2.fingerMenuContext;
          var userId;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return dataLoaders.userLoaderBySessionToken.load(sessionToken);

                case 2:
                  userId = _context.sent.id;


                  (0, _mutation.logUserRequest)(fingerMenuContext, 'Query - User', dataLoaders, sessionToken);

                  return _context.abrupt('return', (0, _immutable.Map)({ id: userId }));

                case 5:
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
    viewer: {
      type: _Viewer2.default,
      resolve: function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_, args, _ref4) {
          var sessionToken = _ref4.sessionToken,
              dataLoaders = _ref4.dataLoaders,
              fingerMenuContext = _ref4.fingerMenuContext;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  (0, _mutation.logUserRequest)(fingerMenuContext, 'Query - Viewer', dataLoaders, sessionToken);

                  return _context2.abrupt('return', (0, _immutable.Map)({ id: 'ViewerId' }));

                case 2:
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
    node: _interface.NodeField
  }
});