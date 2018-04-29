'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

exports.default = new _graphql.GraphQLInputObjectType({
  name: 'PaymentGroupInput',
  fields: {
    id: { type: _graphql.GraphQLID },
    discount: { type: _graphql.GraphQLFloat },
    paidAt: { type: _graphql.GraphQLString }
  }
});