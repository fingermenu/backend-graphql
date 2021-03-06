'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

exports.default = new _graphql.GraphQLObjectType({
  name: 'QuestionAndAnswer',
  fields: {
    question: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('question');
      }
    },
    answer: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('answer');
      }
    }
  }
});