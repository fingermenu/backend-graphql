// @flow

import { GraphQLString, GraphQLObjectType } from 'graphql';

export default new GraphQLObjectType({
  name: 'RestaurantImages',
  fields: {
    logo: {
      type: GraphQLString,
      resolve: _ => _.get('logo'),
    },
    primaryLandingPageBackgroundImageUrl: {
      type: GraphQLString,
      resolve: _ => _.get('primaryLandingPageBackgroundImageUrl'),
    },
    secondaryLandingPageBackgroundImageUrl: {
      type: GraphQLString,
      resolve: _ => _.get('secondaryLandingPageBackgroundImageUrl'),
    },
    primaryTopBannerImageUrl: {
      type: GraphQLString,
      resolve: _ => _.get('primaryTopBannerImageUrl'),
    },
    secondaryTopBannerImageUrl: {
      type: GraphQLString,
      resolve: _ => _.get('secondaryTopBannerImageUrl'),
    },
  },
});
