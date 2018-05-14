'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

exports.default = new _graphql.GraphQLObjectType({
  name: 'RestaurantLanguages',
  fields: {
    display: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('display');
      }
    },
    printToKitchen: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('printToKitchen');
      }
    },
    printOnReceipt: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('printOnReceipt');
      }
    }
  }
});