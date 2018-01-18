'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tagLoaderById = exports.tableStateLoaderById = exports.languageLoaderById = exports.languageLoaderByKey = undefined;

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

var _TableStateLoader2 = _interopRequireDefault(_TableStateLoader);

var _TagLoader = require('./TagLoader');

var _TagLoader2 = _interopRequireDefault(_TagLoader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.tableStateLoaderById = _TableStateLoader2.default;
exports.tagLoaderById = _TagLoader2.default;