'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOrders = exports.OrderConnection = exports.getOrder = exports.Order = exports.getTables = exports.TableConnection = exports.getTable = exports.Table = exports.getRestaurants = exports.RestaurantConnection = exports.getRestaurant = exports.Restaurant = exports.getMenuItems = exports.MenuItemConnection = exports.getMenuItem = exports.MenuItem = exports.getChoiceItems = exports.ChoiceItemConnection = exports.getChoiceItem = exports.ChoiceItem = exports.getMenus = exports.MenuConnection = exports.getMenu = exports.Menu = exports.RootQuery = undefined;

var _Menu2 = require('./Menu');

Object.defineProperty(exports, 'getMenu', {
  enumerable: true,
  get: function get() {
    return _Menu2.getMenu;
  }
});

var _MenuConnection2 = require('./MenuConnection');

Object.defineProperty(exports, 'getMenus', {
  enumerable: true,
  get: function get() {
    return _MenuConnection2.getMenus;
  }
});

var _ChoiceItem2 = require('./ChoiceItem');

Object.defineProperty(exports, 'getChoiceItem', {
  enumerable: true,
  get: function get() {
    return _ChoiceItem2.getChoiceItem;
  }
});

var _ChoiceItemConnection2 = require('./ChoiceItemConnection');

Object.defineProperty(exports, 'getChoiceItems', {
  enumerable: true,
  get: function get() {
    return _ChoiceItemConnection2.getChoiceItems;
  }
});

var _MenuItem2 = require('./MenuItem');

Object.defineProperty(exports, 'getMenuItem', {
  enumerable: true,
  get: function get() {
    return _MenuItem2.getMenuItem;
  }
});

var _MenuItemConnection2 = require('./MenuItemConnection');

Object.defineProperty(exports, 'getMenuItems', {
  enumerable: true,
  get: function get() {
    return _MenuItemConnection2.getMenuItems;
  }
});

var _Restaurant2 = require('./Restaurant');

Object.defineProperty(exports, 'getRestaurant', {
  enumerable: true,
  get: function get() {
    return _Restaurant2.getRestaurant;
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

var _TableConnection2 = require('./TableConnection');

Object.defineProperty(exports, 'getTables', {
  enumerable: true,
  get: function get() {
    return _TableConnection2.getTables;
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

var _Menu3 = _interopRequireDefault(_Menu2);

var _MenuConnection3 = _interopRequireDefault(_MenuConnection2);

var _ChoiceItem3 = _interopRequireDefault(_ChoiceItem2);

var _ChoiceItemConnection3 = _interopRequireDefault(_ChoiceItemConnection2);

var _MenuItem3 = _interopRequireDefault(_MenuItem2);

var _MenuItemConnection3 = _interopRequireDefault(_MenuItemConnection2);

var _Restaurant3 = _interopRequireDefault(_Restaurant2);

var _RestaurantConnection3 = _interopRequireDefault(_RestaurantConnection2);

var _Table3 = _interopRequireDefault(_Table2);

var _TableConnection3 = _interopRequireDefault(_TableConnection2);

var _Order3 = _interopRequireDefault(_Order2);

var _OrderConnection3 = _interopRequireDefault(_OrderConnection2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.RootQuery = _RootQuery3.default;
exports.Menu = _Menu3.default;
exports.MenuConnection = _MenuConnection3.default;
exports.ChoiceItem = _ChoiceItem3.default;
exports.ChoiceItemConnection = _ChoiceItemConnection3.default;
exports.MenuItem = _MenuItem3.default;
exports.MenuItemConnection = _MenuItemConnection3.default;
exports.Restaurant = _Restaurant3.default;
exports.RestaurantConnection = _RestaurantConnection3.default;
exports.Table = _Table3.default;
exports.TableConnection = _TableConnection3.default;
exports.Order = _Order3.default;
exports.OrderConnection = _OrderConnection3.default;