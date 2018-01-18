'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRootSchema = exports.tagLoaderById = exports.tableStateLoaderById = exports.languageLoaderById = exports.languageLoaderByKey = undefined;

var _loaders = require('./loaders');

Object.defineProperty(exports, 'languageLoaderByKey', {
  enumerable: true,
  get: function get() {
    return _loaders.languageLoaderByKey;
  }
});
Object.defineProperty(exports, 'languageLoaderById', {
  enumerable: true,
  get: function get() {
    return _loaders.languageLoaderById;
  }
});
Object.defineProperty(exports, 'tableStateLoaderById', {
  enumerable: true,
  get: function get() {
    return _loaders.tableStateLoaderById;
  }
});
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