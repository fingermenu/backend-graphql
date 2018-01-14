'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

exports.default = new _graphql.GraphQLInputObjectType({
  name: 'LanguageStringTuple',
  fields: {
    language: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
    value: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) }
  }
});