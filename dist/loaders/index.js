'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.otherTagId = exports.tagLoaderById = exports.tableStateLoaderById = exports.tableStateLoaderByKey = exports.tableLoaderById = exports.sizeLoaderById = exports.servingTimeLoaderById = exports.restaurantLoaderById = exports.packageBundleLoaderByRestaurantId = exports.menuItemPriceLoaderById = exports.menuItemLoaderById = exports.menuLoaderById = exports.languageLoaderById = exports.languageLoaderByKey = exports.dishTypeLoaderById = exports.dietaryOptionLoaderById = exports.departmentCategoryLoaderById = exports.choiceItemPriceLoaderById = exports.choiceItemLoaderById = undefined;

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

Object.defineProperty(exports, 'otherTagId', {
  enumerable: true,
  get: function get() {
    return _TagLoader.otherTagId;
  }
});

var _ChoiceItemLoader = require('./ChoiceItemLoader');

var _ChoiceItemLoader2 = _interopRequireDefault(_ChoiceItemLoader);

var _ChoiceItemPriceLoader = require('./ChoiceItemPriceLoader');

var _ChoiceItemPriceLoader2 = _interopRequireDefault(_ChoiceItemPriceLoader);

var _DepartmentCategoryLoader = require('./DepartmentCategoryLoader');

var _DepartmentCategoryLoader2 = _interopRequireDefault(_DepartmentCategoryLoader);

var _DietaryOptionLoader = require('./DietaryOptionLoader');

var _DietaryOptionLoader2 = _interopRequireDefault(_DietaryOptionLoader);

var _DishTypeLoader = require('./DishTypeLoader');

var _DishTypeLoader2 = _interopRequireDefault(_DishTypeLoader);

var _MenuLoader = require('./MenuLoader');

var _MenuLoader2 = _interopRequireDefault(_MenuLoader);

var _MenuItemLoader = require('./MenuItemLoader');

var _MenuItemLoader2 = _interopRequireDefault(_MenuItemLoader);

var _MenuItemPriceLoader = require('./MenuItemPriceLoader');

var _MenuItemPriceLoader2 = _interopRequireDefault(_MenuItemPriceLoader);

var _PackageBundleLoader = require('./PackageBundleLoader');

var _PackageBundleLoader2 = _interopRequireDefault(_PackageBundleLoader);

var _RestaurantLoader = require('./RestaurantLoader');

var _RestaurantLoader2 = _interopRequireDefault(_RestaurantLoader);

var _ServingTimeLoader = require('./ServingTimeLoader');

var _ServingTimeLoader2 = _interopRequireDefault(_ServingTimeLoader);

var _SizeLoader = require('./SizeLoader');

var _SizeLoader2 = _interopRequireDefault(_SizeLoader);

var _TableLoader = require('./TableLoader');

var _TableLoader2 = _interopRequireDefault(_TableLoader);

var _TagLoader2 = _interopRequireDefault(_TagLoader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.choiceItemLoaderById = _ChoiceItemLoader2.default;
exports.choiceItemPriceLoaderById = _ChoiceItemPriceLoader2.default;
exports.departmentCategoryLoaderById = _DepartmentCategoryLoader2.default;
exports.dietaryOptionLoaderById = _DietaryOptionLoader2.default;
exports.dishTypeLoaderById = _DishTypeLoader2.default;
exports.menuLoaderById = _MenuLoader2.default;
exports.menuItemLoaderById = _MenuItemLoader2.default;
exports.menuItemPriceLoaderById = _MenuItemPriceLoader2.default;
exports.packageBundleLoaderByRestaurantId = _PackageBundleLoader2.default;
exports.restaurantLoaderById = _RestaurantLoader2.default;
exports.servingTimeLoaderById = _ServingTimeLoader2.default;
exports.sizeLoaderById = _SizeLoader2.default;
exports.tableLoaderById = _TableLoader2.default;
exports.tagLoaderById = _TagLoader2.default;