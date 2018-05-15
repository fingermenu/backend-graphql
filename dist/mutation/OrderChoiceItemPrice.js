'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _Customer = require('./Customer');

var _Customer2 = _interopRequireDefault(_Customer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _graphql.GraphQLInputObjectType({
  name: 'OrderChoiceItemPriceInput',
  fields: {
    orderChoiceItemPriceId: { type: _graphql.GraphQLID },
    choiceItemPriceId: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLID) },
    quantity: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt) },
    notes: { type: _graphql.GraphQLString },
    paid: { type: _graphql.GraphQLBoolean },
    discount: { type: _graphql.GraphQLFloat },
    customer: { type: _Customer2.default }
  }
});