'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

exports.default = new _graphql.GraphQLObjectType({
  name: 'PaymentGroup',
  fields: {
    paymentGroupId: {
      type: _graphql.GraphQLID,
      resolve: function resolve(_) {
        return _.get('paymentGroupId');
      }
    },
    discount: {
      type: _graphql.GraphQLFloat,
      resolve: function resolve(_) {
        return _.get('discount');
      }
    },
    paidAt: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('paidAt') ? _.get('paidAt') : null;
      }
    }
  }
});