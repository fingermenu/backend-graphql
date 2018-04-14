'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserFeedback = undefined;

var _parseServerCommon = require('@fingermenu/parse-server-common');

var _graphql = require('graphql');

var _interface = require('../interface');

var _QuestionAndAnswer = require('./QuestionAndAnswer');

var _QuestionAndAnswer2 = _interopRequireDefault(_QuestionAndAnswer);

var _Restaurant = require('./Restaurant');

var _Restaurant2 = _interopRequireDefault(_Restaurant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var getUserFeedback = exports.getUserFeedback = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(serviceTimeId, sessionToken) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', new _parseServerCommon.UserFeedbackService().read(serviceTimeId, null, sessionToken));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getUserFeedback(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = new _graphql.GraphQLObjectType({
  name: 'UserFeedback',
  fields: {
    id: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLID),
      resolve: function resolve(_) {
        return _.get('id');
      }
    },
    questionAndAnswers: {
      type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(_QuestionAndAnswer2.default)),
      resolve: function resolve(_) {
        return _.get('questionAndAnswers') ? _.get('questionAndAnswers').toArray() : [];
      }
    },
    others: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('others');
      }
    },
    submittedAt: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLString),
      resolve: function resolve(_) {
        return _.get('submittedAt').toISOString();
      }
    },
    restaurant: {
      type: _Restaurant2.default,
      resolve: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_, args, _ref3) {
          var restaurantLoaderById = _ref3.dataLoaders.restaurantLoaderById;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  return _context2.abrupt('return', _.get('restaurantId') ? restaurantLoaderById.load(_.get('restaurantId')) : null);

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
    }
  },
  interfaces: [_interface.NodeInterface]
});