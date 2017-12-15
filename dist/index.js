'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRootSchema = exports.tagLoaderById = undefined;

var _loaders = require('./loaders');

Object.defineProperty(exports, 'tagLoaderById', {
  enumerable: true,
  get: function get() {
    return _loaders.tagLoaderById;
  }
});

var _RootSchema = require('./RootSchema');

var _RootSchema2 = _interopRequireDefault(_RootSchema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.getRootSchema = _RootSchema2.default;