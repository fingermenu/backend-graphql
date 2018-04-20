'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

exports.default = new _graphql.GraphQLObjectType({
  name: 'MenuItemPriceRules',
  fields: {
    mustChooseSize: {
      type: _graphql.GraphQLBoolean,
      resolve: function resolve(_) {
        return _.get('mustChooseSize');
      }
    },
    mustChooseDietaryOption: {
      type: _graphql.GraphQLBoolean,
      resolve: function resolve(_) {
        return _.get('mustChooseDietaryOption');
      }
    },
    minNumberOfSideDishes: {
      type: _graphql.GraphQLInt,
      resolve: function resolve(_) {
        return _.get('minNumberOfSideDishes');
      }
    },
    maxNumberOfSideDishes: {
      type: _graphql.GraphQLInt,
      resolve: function resolve(_) {
        return _.get('maxNumberOfSideDishes');
      }
    }
  }
});