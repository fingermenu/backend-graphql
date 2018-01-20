'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tagLoaderById = exports.tableStateLoaderById = exports.tableStateLoaderByKey = exports.languageLoaderById = exports.languageLoaderByKey = undefined;

var _LanguageLoader = require('./LanguageLoader');

Object.defineProperty(exports, 'languageLoaderByKey', {
  enumerable: true,
  get: function get() {
    return _LanguageLoader.languageLoaderByKey;
  }
});
Object.defineProperty(exports, 'languageLoaderById', {
  enumerable: true,
  get: function get() {
    return _LanguageLoader.languageLoaderById;
  }
});

var _TableStateLoader = require('./TableStateLoader');

Object.defineProperty(exports, 'tableStateLoaderByKey', {
  enumerable: true,
  get: function get() {
    return _TableStateLoader.tableStateLoaderByKey;
  }
});
Object.defineProperty(exports, 'tableStateLoaderById', {
  enumerable: true,
  get: function get() {
    return _TableStateLoader.tableStateLoaderById;
  }
});

var _TagLoader = require('./TagLoader');

var _TagLoader2 = _interopRequireDefault(_TagLoader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.tagLoaderById = _TagLoader2.default;