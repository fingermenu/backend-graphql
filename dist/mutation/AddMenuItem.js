'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _type = require('../type');

var _MenuItemHelper = require('./MenuItemHelper');

var _LanguageStringTuple = require('./LanguageStringTuple');

var _LanguageStringTuple2 = _interopRequireDefault(_LanguageStringTuple);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = (0, _graphqlRelay.mutationWithClientMutationId)({
  name: 'AddMenuItem',
  inputFields: {
    name: { type: new _graphql.GraphQLNonNull(new _graphql.GraphQLList(_LanguageStringTuple2.default)) },
    description: { type: new _graphql.GraphQLList(_LanguageStringTuple2.default) },
    menuItemPageUrl: { type: _graphql.GraphQLString },
    imageUrl: { type: _graphql.GraphQLString }
  },
  outputFields: {
    menuItem: {
      type: _type.MenuItemConnection.edgeType,
      resolve: function resolve(_) {
        return _.get('menuItem');
      }
    }
  },
  mutateAndGetPayload: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(args, _ref2) {
      var dataLoaders = _ref2.dataLoaders,
          sessionToken = _ref2.sessionToken,
          language = _ref2.language;
      var menuItemId;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _MenuItemHelper.addMenuItem)(args, dataLoaders, sessionToken);

            case 2:
              menuItemId = _context.sent;
              _context.t0 = _immutable.Map;
              _context.next = 6;
              return (0, _type.getMenuItems)((0, _immutable.Map)({ MenuItemIds: _immutable.List.of(menuItemId) }), dataLoaders, sessionToken, language);

            case 6:
              _context.t1 = _context.sent.edges[0];
              _context.t2 = {
                menuItem: _context.t1
              };
              return _context.abrupt('return', (0, _context.t0)(_context.t2));

            case 9:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function mutateAndGetPayload(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }()
});