'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

exports.default = new _graphql.GraphQLObjectType({
  name: 'Customer',
  fields: {
    id: {
      type: _graphql.GraphQLID,
      resolve: function resolve(_) {
        return _.get('id');
      }
    },
    name: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('name');
      }
    },
    type: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('type');
      }
    }
  }
});