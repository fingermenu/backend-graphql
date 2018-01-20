'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTable = exports.Table = exports.getRestaurants = exports.RestaurantConnection = exports.getMenuItems = exports.MenuItemConnection = exports.getChoiceItems = exports.ChoiceItemConnection = exports.RootQuery = undefined;

var _ChoiceItemConnection2 = require('./ChoiceItemConnection');

Object.defineProperty(exports, 'getChoiceItems', {
  enumerable: true,
  get: function get() {
    return _ChoiceItemConnection2.getChoiceItems;
  }
});

var _MenuItemConnection2 = require('./MenuItemConnection');

Object.defineProperty(exports, 'getMenuItems', {
  enumerable: true,
  get: function get() {
    return _MenuItemConnection2.getMenuItems;
  }
});

var _RestaurantConnection2 = require('./RestaurantConnection');

Object.defineProperty(exports, 'getRestaurants', {
  enumerable: true,
  get: function get() {
    return _RestaurantConnection2.getRestaurants;
  }
});

var _Table2 = require('./Table');

Object.defineProperty(exports, 'getTable', {
  enumerable: true,
  get: function get() {
    return _Table2.getTable;
  }
});

var _RootQuery2 = require('./RootQuery');

var _RootQuery3 = _interopRequireDefault(_RootQuery2);

var _ChoiceItemConnection3 = _interopRequireDefault(_ChoiceItemConnection2);

var _MenuItemConnection3 = _interopRequireDefault(_MenuItemConnection2);

var _RestaurantConnection3 = _interopRequireDefault(_RestaurantConnection2);

var _Table3 = _interopRequireDefault(_Table2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.RootQuery = _RootQuery3.default;
exports.ChoiceItemConnection = _ChoiceItemConnection3.default;
exports.MenuItemConnection = _MenuItemConnection3.default;
exports.RestaurantConnection = _RestaurantConnection3.default;
exports.Table = _Table3.default;