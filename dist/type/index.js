'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRestaurants = exports.RestaurantConnection = exports.RootQuery = undefined;

var _RestaurantConnection2 = require('./RestaurantConnection');

Object.defineProperty(exports, 'getRestaurants', {
  enumerable: true,
  get: function get() {
    return _RestaurantConnection2.getRestaurants;
  }
});

var _RootQuery2 = require('./RootQuery');

var _RootQuery3 = _interopRequireDefault(_RootQuery2);

var _RestaurantConnection3 = _interopRequireDefault(_RestaurantConnection2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.RootQuery = _RootQuery3.default;
exports.RestaurantConnection = _RestaurantConnection3.default;