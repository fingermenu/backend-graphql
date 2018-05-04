'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _type = require('../type');

var _UserFeedbackHelper = require('./UserFeedbackHelper');

var _QuestionAndAnswer = require('./QuestionAndAnswer');

var _QuestionAndAnswer2 = _interopRequireDefault(_QuestionAndAnswer);

var _RequestLogHelper = require('./RequestLogHelper');

var _RequestLogHelper2 = _interopRequireDefault(_RequestLogHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = (0, _graphqlRelay.mutationWithClientMutationId)({
  name: 'SubmitUserFeedback',
  inputFields: {
    appVersion: { type: _graphql.GraphQLString },
    questionAndAnswers: { type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(_QuestionAndAnswer2.default)) },
    others: { type: _graphql.GraphQLString },
    restaurantId: { type: _graphql.GraphQLID }
  },
  outputFields: {
    userFeedback: {
      type: _type.UserFeedbackConnection.edgeType,
      resolve: function resolve(_) {
        return _.get('userFeedback');
      }
    }
  },
  mutateAndGetPayload: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(args, _ref2) {
      var dataLoaders = _ref2.dataLoaders,
          sessionToken = _ref2.sessionToken;
      var userFeedbackId;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              (0, _RequestLogHelper2.default)(args, 'Mutation - Submit User Feedback', dataLoaders, sessionToken);

              _context.next = 3;
              return (0, _UserFeedbackHelper.addUserFeedback)(args, dataLoaders, sessionToken);

            case 3:
              userFeedbackId = _context.sent;
              _context.t0 = _immutable.Map;
              _context.next = 7;
              return (0, _type.getUserFeedbacks)((0, _immutable.Map)({ userFeedbackIds: _immutable.List.of(userFeedbackId) }), sessionToken);

            case 7:
              _context.t1 = _context.sent.edges[0];
              _context.t2 = {
                userFeedback: _context.t1
              };
              return _context.abrupt('return', (0, _context.t0)(_context.t2));

            case 10:
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