'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRootSchema = exports.tagLoaderById = exports.tableStateLoaderById = exports.tableStateLoaderByKey = exports.tableLoaderById = exports.sizeLoaderById = exports.servingTimeLoaderById = exports.restaurantLoaderById = exports.packageBundleLoaderByRestaurantId = exports.menuItemPriceLoaderById = exports.menuItemLoaderById = exports.menuLoaderById = exports.languageLoaderById = exports.languageLoaderByKey = exports.dishTypeLoaderById = exports.dietaryOptionLoaderById = exports.departmentCategoryLoaderById = exports.choiceItemPriceLoaderById = exports.choiceItemLoaderById = undefined;

var _loaders = require('./loaders');

Object.defineProperty(exports, 'choiceItemLoaderById', {
  enumerable: true,
  get: function get() {
    return _loaders.choiceItemLoaderById;
  }
});
Object.defineProperty(exports, 'choiceItemPriceLoaderById', {
  enumerable: true,
  get: function get() {
    return _loaders.choiceItemPriceLoaderById;
  }
});
Object.defineProperty(exports, 'departmentCategoryLoaderById', {
  enumerable: true,
  get: function get() {
    return _loaders.departmentCategoryLoaderById;
  }
});
Object.defineProperty(exports, 'dietaryOptionLoaderById', {
  enumerable: true,
  get: function get() {
    return _loaders.dietaryOptionLoaderById;
  }
});
Object.defineProperty(exports, 'dishTypeLoaderById', {
  enumerable: true,
  get: function get() {
    return _loaders.dishTypeLoaderById;
  }
});
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
Object.defineProperty(exports, 'menuLoaderById', {
  enumerable: true,
  get: function get() {
    return _loaders.menuLoaderById;
  }
});
Object.defineProperty(exports, 'menuItemLoaderById', {
  enumerable: true,
  get: function get() {
    return _loaders.menuItemLoaderById;
  }
});
Object.defineProperty(exports, 'menuItemPriceLoaderById', {
  enumerable: true,
  get: function get() {
    return _loaders.menuItemPriceLoaderById;
  }
});
Object.defineProperty(exports, 'packageBundleLoaderByRestaurantId', {
  enumerable: true,
  get: function get() {
    return _loaders.packageBundleLoaderByRestaurantId;
  }
});
Object.defineProperty(exports, 'restaurantLoaderById', {
  enumerable: true,
  get: function get() {
    return _loaders.restaurantLoaderById;
  }
});
Object.defineProperty(exports, 'servingTimeLoaderById', {
  enumerable: true,
  get: function get() {
    return _loaders.servingTimeLoaderById;
  }
});
Object.defineProperty(exports, 'sizeLoaderById', {
  enumerable: true,
  get: function get() {
    return _loaders.sizeLoaderById;
  }
});
Object.defineProperty(exports, 'tableLoaderById', {
  enumerable: true,
  get: function get() {
    return _loaders.tableLoaderById;
  }
});
Object.defineProperty(exports, 'tableStateLoaderByKey', {
  enumerable: true,
  get: function get() {
    return _loaders.tableStateLoaderByKey;
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