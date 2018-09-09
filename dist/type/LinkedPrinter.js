'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

exports.default = new _graphql.GraphQLObjectType({
  name: 'LinkedPrinter',
  fields: {
    name: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLString),
      resolve: function resolve(_) {
        return _.get('name');
      }
    },
    language: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLString),
      resolve: function resolve(_) {
        return _.get('language');
      }
    },
    numberOfPrints: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt),
      resolve: function resolve(_) {
        return _.get('numberOfPrints') ? _.get('numberOfPrints') : 1;
      }
    }
  }
});