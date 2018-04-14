'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addUserFeedback = exports.addUserFeedbackForProvidedUser = undefined;

var _parseServerCommon = require('@microbusiness/parse-server-common');

var _parseServerCommon2 = require('@fingermenu/parse-server-common');

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var addUserFeedbackForProvidedUser = exports.addUserFeedbackForProvidedUser = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref2, user, dataLoaders, sessionToken) {
    var questionAndAnswers = _ref2.questionAndAnswers,
        others = _ref2.others,
        restaurantId = _ref2.restaurantId;
    var acl;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            acl = _parseServerCommon.ParseWrapperService.createACL(user);


            acl.setRoleReadAccess('administrators', true);
            acl.setRoleWriteAccess('administrators', true);

            return _context.abrupt('return', new _parseServerCommon2.UserFeedbackService().create((0, _immutable.Map)({
              questionAndAnswers: _immutable2.default.fromJS(questionAndAnswers),
              others: others,
              submittedAt: new Date(),
              restaurantId: restaurantId,
              addedByUser: user
            }), acl, sessionToken));

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function addUserFeedbackForProvidedUser(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

var addUserFeedback = exports.addUserFeedback = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(info, dataLoaders, sessionToken) {
    var user;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return dataLoaders.userLoaderBySessionToken.load(sessionToken);

          case 2:
            user = _context2.sent;
            return _context2.abrupt('return', addUserFeedbackForProvidedUser(info, user, dataLoaders, sessionToken));

          case 4:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function addUserFeedback(_x5, _x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();