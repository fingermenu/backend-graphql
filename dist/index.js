'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createUserLoaderBySessionToken = exports.createConfigLoader = exports.getRootSchema = undefined;

var _loader = require('./loader');

Object.defineProperty(exports, 'createConfigLoader', {
  enumerable: true,
  get: function get() {
    return _loader.createConfigLoader;
  }
});
Object.defineProperty(exports, 'createUserLoaderBySessionToken', {
  enumerable: true,
  get: function get() {
    return _loader.createUserLoaderBySessionToken;
  }
});

var _RootSchema = require('./RootSchema');

var _RootSchema2 = _interopRequireDefault(_RootSchema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.getRootSchema = _RootSchema2.default;