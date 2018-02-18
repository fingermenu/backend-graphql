'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

exports.default = new _graphql.GraphQLObjectType({
  name: 'DocumentTemplate',
  fields: {
    name: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('name');
      }
    },
    template: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLString),
      resolve: function resolve(_) {
        return _.get('template');
      }
    }
  }
});