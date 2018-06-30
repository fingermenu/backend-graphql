'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

exports.default = new _graphql.GraphQLInputObjectType({
  name: 'DateTimeRange',
  fields: {
    from: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
    to: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) }
  }
});