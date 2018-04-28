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
    id: { type: _graphql.GraphQLID },
    groupId: { type: _graphql.GraphQLID },
    paymentGroupId: { type: _graphql.GraphQLID },
    paymentGroupDiscount: { type: _graphql.GraphQLFloat },
    paymentGroupDateTime: { type: _graphql.GraphQLString },
    menuItemPriceId: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLID) },
    quantity: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt) },
    notes: { type: _graphql.GraphQLString },
    paid: { type: _graphql.GraphQLBoolean },
    orderChoiceItemPrices: { type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(_OrderChoiceItemPrice2.default)) },
    servingTimeId: { type: _graphql.GraphQLID },
    discount: { type: _graphql.GraphQLFloat }
  }
});