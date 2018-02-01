'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _type = require('../type');

var _TableHelper = require('./TableHelper');

var _TableHelper2 = _interopRequireDefault(_TableHelper);

var _LanguageStringTuple = require('./LanguageStringTuple');

var _LanguageStringTuple2 = _interopRequireDefault(_LanguageStringTuple);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = (0, _graphqlRelay.mutationWithClientMutationId)({
  name: 'UpdateTable',
  inputFields: {
    id: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLID) },
    name: { type: new _graphql.GraphQLList(_LanguageStringTuple2.default) },
    status: { type: _graphql.GraphQLString },
    tableState: { type: _graphql.GraphQLString },
    numberOfAdults: { type: _graphql.GraphQLInt },
    numberOfChildren: { type: _graphql.GraphQLInt },
    customerName: { type: _graphql.GraphQLString },
    notes: { type: _graphql.GraphQLString }
  },
  outputFields: {
    errorMessage: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('errorMessage');
      }
    },
    table: {
      type: _type.TableConnection.edgeType,
      resolve: function resolve(_) {
        return _.get('table');
      }
    }
  },
  mutateAndGetPayload: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(args, _ref2) {
      var dataLoaders = _ref2.dataLoaders,
          sessionToken = _ref2.sessionToken,
          language = _ref2.language;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return (0, _TableHelper2.default)(args, dataLoaders, sessionToken);

            case 3:
              _context.t0 = _immutable.Map;
              _context.next = 6;
              return (0, _type.getTables)((0, _immutable.Map)({ tableIds: _immutable.List.of(args.id) }), dataLoaders, sessionToken, language);

            case 6:
              _context.t1 = _context.sent.edges[0];
              _context.t2 = {
                table: _context.t1
              };
              return _context.abrupt('return', (0, _context.t0)(_context.t2));

            case 11:
              _context.prev = 11;
              _context.t3 = _context['catch'](0);
              return _context.abrupt('return', (0, _immutable.Map)({ errorMessage: _context.t3 instanceof Error ? _context.t3.message : _context.t3 }));

            case 14:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[0, 11]]);
    }));

    return function mutateAndGetPayload(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }()
});