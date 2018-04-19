'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tableStateLoaderById = exports.tableStateLoaderByKey = undefined;

var _parseServerCommon = require('@fingermenu/parse-server-common');

var _immutable = require('immutable');

var _dataloader = require('dataloader');

var _dataloader2 = _interopRequireDefault(_dataloader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var tableStateLoaderByKey = exports.tableStateLoaderByKey = new _dataloader2.default(function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(keys) {
    var tableStateService;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            tableStateService = new _parseServerCommon.TableStateService();
            return _context2.abrupt('return', Promise.all(keys.map(function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(key) {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return tableStateService.search((0, _immutable.Map)({ conditions: (0, _immutable.Map)({ key: key }) }));

                      case 2:
                        return _context.abrupt('return', _context.sent.first());

                      case 3:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, undefined);
              }));

              return function (_x2) {
                return _ref2.apply(this, arguments);
              };
            }())));

          case 2:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());

var tableStateLoaderById = exports.tableStateLoaderById = new _dataloader2.default(function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(ids) {
    var tableStates;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return new _parseServerCommon.TableStateService().search((0, _immutable.Map)({ ids: ids }));

          case 2:
            tableStates = _context3.sent;
            return _context3.abrupt('return', ids.map(function (id) {
              return tableStates.find(function (tableState) {
                return tableState.get('id').localeCompare(id) === 0;
              });
            }));

          case 4:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function (_x3) {
    return _ref3.apply(this, arguments);
  };
}());