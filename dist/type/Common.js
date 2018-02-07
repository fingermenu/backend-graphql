'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Common = function Common() {
  _classCallCheck(this, Common);
};

Common.getTranslation = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(info, columnName, language, configLoader) {
    var allValues;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            allValues = info.get(columnName);

            if (allValues) {
              _context.next = 3;
              break;
            }

            return _context.abrupt('return', null);

          case 3:
            if (!allValues.has(language)) {
              _context.next = 5;
              break;
            }

            return _context.abrupt('return', allValues.get(language));

          case 5:
            _context.t0 = allValues;
            _context.next = 8;
            return configLoader.load('fallbackLanguage');

          case 8:
            _context.t1 = _context.sent;
            return _context.abrupt('return', _context.t0.get.call(_context.t0, _context.t1));

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = Common;