'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.otherTagId = undefined;

var _parseServerCommon = require('@microbusiness/parse-server-common');

var _parseServerCommon2 = require('@fingermenu/parse-server-common');

var _immutable = require('immutable');

var _dataloader = require('dataloader');

var _dataloader2 = _interopRequireDefault(_dataloader);

var _cuid = require('cuid');

var _cuid2 = _interopRequireDefault(_cuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var otherTagId = exports.otherTagId = (0, _cuid2.default)();

var tagLoaderById = new _dataloader2.default(function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ids) {
    var tags, fallbackLanguage;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return new _parseServerCommon2.TagService().search((0, _immutable.Map)({ ids: (0, _immutable.List)(ids), limit: 1000, skip: 0 }));

          case 2:
            tags = _context.sent;
            _context.next = 5;
            return (0, _parseServerCommon.createConfigLoaderByKey)().load('fallbackLanguage');

          case 5:
            fallbackLanguage = _context.sent;
            return _context.abrupt('return', ids.map(function (id) {
              if (id.localeCompare(otherTagId) === 0) {
                return (0, _immutable.Map)({ id: otherTagId, key: '', name: (0, _immutable.Map)(), desription: (0, _immutable.Map)(), level: 1 }).setIn(['name', fallbackLanguage], 'Other').setIn(['desription', fallbackLanguage], 'Other');
              }

              return tags.find(function (tag) {
                return tag.get('id').localeCompare(id) === 0;
              });
            }));

          case 7:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());

exports.default = tagLoaderById;