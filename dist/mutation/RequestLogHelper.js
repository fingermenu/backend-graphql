'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _parseServerCommon = require('@fingermenu/parse-server-common');

var _immutable = require('immutable');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var logUserRequest = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref2, requestType, _ref3, sessionToken) {
    var appVersion = _ref2.appVersion;
    var userLoaderBySessionToken = _ref3.userLoaderBySessionToken,
        configLoader = _ref3.configLoader;
    var enableLogRequest;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!('watchdog-app'.localeCompare(appVersion) === 0)) {
              _context.next = 2;
              break;
            }

            return _context.abrupt('return');

          case 2:
            _context.next = 4;
            return configLoader.load('enableLogRequest');

          case 4:
            enableLogRequest = _context.sent;

            if (enableLogRequest) {
              _context.next = 7;
              break;
            }

            return _context.abrupt('return');

          case 7:
            _context.t0 = new _parseServerCommon.RequestLogService();
            _context.t1 = _immutable.Map;
            _context.t2 = appVersion;
            _context.t3 = requestType;

            if (!sessionToken) {
              _context.next = 17;
              break;
            }

            _context.next = 14;
            return userLoaderBySessionToken.load(sessionToken);

          case 14:
            _context.t4 = _context.sent.id;
            _context.next = 18;
            break;

          case 17:
            _context.t4 = undefined;

          case 18:
            _context.t5 = _context.t4;
            _context.t6 = {
              appVersion: _context.t2,
              requestType: _context.t3,
              userId: _context.t5
            };
            _context.t7 = (0, _context.t1)(_context.t6);
            _context.t8 = sessionToken;
            return _context.abrupt('return', _context.t0.create.call(_context.t0, _context.t7, null, _context.t8));

          case 23:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function logUserRequest(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = logUserRequest;