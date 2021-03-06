'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

exports.default = new _graphql.GraphQLObjectType({
  name: 'StringWithLanguage',
  fields: {
    language: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLString),
      resolve: function resolve(_) {
        return _.get('language');
      }
    },
    value: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('value');
      }
    }
  }
});