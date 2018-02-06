'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _Printer = require('./Printer');

var _Printer2 = _interopRequireDefault(_Printer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _graphql.GraphQLObjectType({
  name: 'RestaurantConfigurations',
  fields: {
    printers: {
      type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(_Printer2.default)),
      resolve: function resolve(_) {
        return _.get('printers') ? _.get('printers').toArray() : [];
      }
    }
  }
});