'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _commonJavascript = require('@microbusiness/common-javascript');

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _parseServerCommon = require('@fingermenu/parse-server-common');

var _type = require('../type');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var updateTable = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref2, dataLoaders, sessionToken) {
    var id = _ref2.id,
        name = _ref2.name,
        status = _ref2.status,
        tableState = _ref2.tableState,
        numberOfAdults = _ref2.numberOfAdults,
        numberOfChildren = _ref2.numberOfChildren,
        customerName = _ref2.customerName,
        notes = _ref2.notes;
    var tableInfo;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (id) {
              _context.next = 2;
              break;
            }

            throw new Error('Table Id not provided.');

          case 2:
            _context.next = 4;
            return (0, _type.getTable)(id, sessionToken);

          case 4:
            _context.t1 = _commonJavascript.Common.isNullOrUndefined(name) ? (0, _immutable.Map)() : _immutable2.default.fromJS(name).reduce(function (reduction, languageValue) {
              return reduction.set(languageValue.language, languageValue.value);
            }, (0, _immutable.Map)());
            _context.t2 = _commonJavascript.Common.isNullOrUndefined(status) ? (0, _immutable.Map)() : (0, _immutable.Map)({ status: status });
            _context.t0 = _context.sent.merge(_context.t1).merge(_context.t2);

            if (!_commonJavascript.Common.isNullOrUndefined(tableState)) {
              _context.next = 11;
              break;
            }

            _context.t3 = (0, _immutable.Map)();
            _context.next = 17;
            break;

          case 11:
            _context.t4 = _immutable.Map;
            _context.next = 14;
            return dataLoaders.tableStateLoaderByKey.load(tableState);

          case 14:
            _context.t5 = _context.sent;
            _context.t6 = {
              tableState: _context.t5
            };
            _context.t3 = (0, _context.t4)(_context.t6);

          case 17:
            _context.t7 = _context.t3;
            _context.t8 = _commonJavascript.Common.isNullOrUndefined(numberOfAdults) ? (0, _immutable.Map)() : (0, _immutable.Map)({ numberOfAdults: numberOfAdults });
            _context.t9 = _commonJavascript.Common.isNullOrUndefined(numberOfChildren) ? (0, _immutable.Map)() : (0, _immutable.Map)({ numberOfChildren: numberOfChildren });
            _context.t10 = _commonJavascript.Common.isNullOrUndefined(customerName) ? (0, _immutable.Map)() : (0, _immutable.Map)({ customerName: customerName });
            _context.t11 = _commonJavascript.Common.isNullOrUndefined(notes) ? (0, _immutable.Map)() : (0, _immutable.Map)({ notes: notes });
            tableInfo = _context.t0.merge.call(_context.t0, _context.t7).merge(_context.t8).merge(_context.t9).merge(_context.t10).merge(_context.t11);
            _context.next = 25;
            return new _parseServerCommon.TableService().update(tableInfo, sessionToken);

          case 25:
            return _context.abrupt('return', tableInfo);

          case 26:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function updateTable(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = updateTable;