'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

exports.default = new _graphql.GraphQLObjectType({
  name: 'Printer',
  fields: {
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
    },
    hostname: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLString),
      resolve: function resolve(_) {
        return _.get('hostname');
      }
    },
    port: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt),
      resolve: function resolve(_) {
        return _.get('port');
      }
    },
    maxLineWidth: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt),
      resolve: function resolve(_) {
        return _.get('maxLineWidth');
      }
    }
  }
});