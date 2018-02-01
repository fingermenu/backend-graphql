'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _OrderChoiceItemPrice = require('./OrderChoiceItemPrice');

var _OrderChoiceItemPrice2 = _interopRequireDefault(_OrderChoiceItemPrice);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _graphql.GraphQLInputObjectType({
  name: 'OrderMenuItemPriceInput',
  fields: {
    menuItemPriceId: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLID) },
    quantity: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt) },
    orderChoiceItemPrices: { type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(_OrderChoiceItemPrice2.default)) }
  }
});