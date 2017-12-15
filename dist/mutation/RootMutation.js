'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _AddRestaurant = require('./AddRestaurant');

var _AddRestaurant2 = _interopRequireDefault(_AddRestaurant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _graphql.GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addRestaurant: _AddRestaurant2.default
  }
});