'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

exports.default = new _graphql.GraphQLInputObjectType({
  name: 'OrderChoiceItemPriceInput',
  fields: {
    choiceItemPriceId: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLID) },
    quantity: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt) },
    notes: { type: _graphql.GraphQLString },
    paid: { type: _graphql.GraphQLBoolean }
  }
});