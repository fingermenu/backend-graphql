'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RootMutation = exports.logUserRequest = undefined;

var _RequestLogHelper = require('./RequestLogHelper');

var _RequestLogHelper2 = _interopRequireDefault(_RequestLogHelper);

var _RootMutation2 = require('./RootMutation');

var _RootMutation3 = _interopRequireDefault(_RootMutation2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.logUserRequest = _RequestLogHelper2.default;
exports.RootMutation = _RootMutation3.default;