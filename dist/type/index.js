'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOrders = exports.OrderConnection = exports.getOrder = exports.Order = exports.getTable = exports.Table = exports.getRestaurants = exports.RestaurantConnection = exports.getMenuItems = exports.MenuItemConnection = exports.getMenus = exports.MenuConnection = exports.getChoiceItems = exports.ChoiceItemConnection = exports.RootQuery = undefined;

var _ChoiceItemConnection2 = require('./ChoiceItemConnection');

Object.defineProperty(exports, 'getChoiceItems', {
  enumerable: true,
  get: function get() {
    return _ChoiceItemConnection2.getChoiceItems;
  }
});

var _MenuConnection2 = require('./MenuConnection');

Object.defineProperty(exports, 'getMenus', {
  enumerable: true,
  get: function get() {
    return _MenuConnection2.getMenus;
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

var _Order2 = require('./Order');

Object.defineProperty(exports, 'getOrder', {
  enumerable: true,
  get: function get() {
    return _Order2.getOrder;
  }
});

var _OrderConnection2 = require('./OrderConnection');

Object.defineProperty(exports, 'getOrders', {
  enumerable: true,
  get: function get() {
    return _OrderConnection2.getOrders;
  }
});

var _RootQuery2 = require('./RootQuery');

var _RootQuery3 = _interopRequireDefault(_RootQuery2);

var _ChoiceItemConnection3 = _interopRequireDefault(_ChoiceItemConnection2);

var _MenuConnection3 = _interopRequireDefault(_MenuConnection2);

var _MenuItemConnection3 = _interopRequireDefault(_MenuItemConnection2);

var _RestaurantConnection3 = _interopRequireDefault(_RestaurantConnection2);

var _Table3 = _interopRequireDefault(_Table2);

var _Order3 = _interopRequireDefault(_Order2);

var _OrderConnection3 = _interopRequireDefault(_OrderConnection2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.RootQuery = _RootQuery3.default;
exports.ChoiceItemConnection = _ChoiceItemConnection3.default;
exports.MenuConnection = _MenuConnection3.default;
exports.MenuItemConnection = _MenuItemConnection3.default;
exports.RestaurantConnection = _RestaurantConnection3.default;
exports.Table = _Table3.default;
exports.Order = _Order3.default;
exports.OrderConnection = _OrderConnection3.default;