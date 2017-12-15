'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOwnedRestaurants = exports.OwnedRestaurantConnection = exports.RootQuery = undefined;

var _OwnedRestaurantConnection2 = require('./OwnedRestaurantConnection');

Object.defineProperty(exports, 'getOwnedRestaurants', {
  enumerable: true,
  get: function get() {
    return _OwnedRestaurantConnection2.getOwnedRestaurants;
  }
});

var _RootQuery2 = require('./RootQuery');

var _RootQuery3 = _interopRequireDefault(_RootQuery2);

var _OwnedRestaurantConnection3 = _interopRequireDefault(_OwnedRestaurantConnection2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.RootQuery = _RootQuery3.default;
exports.OwnedRestaurantConnection = _OwnedRestaurantConnection3.default;