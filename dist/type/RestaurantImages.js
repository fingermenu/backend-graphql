'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

exports.default = new _graphql.GraphQLObjectType({
  name: 'RestaurantImages',
  fields: {
    primaryLandingPageBackgroundImageUrl: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('primaryLandingPageBackgroundImageUrl');
      }
    },
    secondaryLandingPageBackgroundImageUrl: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('secondaryLandingPageBackgroundImageUrl');
      }
    },
    primaryTopBannerImageUrl: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('primaryTopBannerImageUrl');
      }
    },
    secondaryTopBannerImageUrl: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_) {
        return _.get('secondaryTopBannerImageUrl');
      }
    }
  }
});