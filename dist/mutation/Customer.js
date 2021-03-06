'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

exports.default = new _graphql.GraphQLInputObjectType({
  name: 'CustomerInput',
  fields: {
    customerId: { type: _graphql.GraphQLID },
    name: { type: _graphql.GraphQLString },
    type: { type: _graphql.GraphQLString }
  }
});