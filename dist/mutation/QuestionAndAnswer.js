'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

exports.default = new _graphql.GraphQLInputObjectType({
  name: 'QuestionAndAnswerInput',
  fields: {
    question: { type: _graphql.GraphQLString },
    answer: { type: _graphql.GraphQLString }
  }
});