'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _AddChoiceItem = require('./AddChoiceItem');

var _AddChoiceItem2 = _interopRequireDefault(_AddChoiceItem);

var _AddMenuItem = require('./AddMenuItem');

var _AddMenuItem2 = _interopRequireDefault(_AddMenuItem);

var _AddRestaurant = require('./AddRestaurant');

var _AddRestaurant2 = _interopRequireDefault(_AddRestaurant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _graphql.GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addChoiceItem: _AddChoiceItem2.default,
    addMenuItem: _AddMenuItem2.default,
    addRestaurant: _AddRestaurant2.default
  }
});