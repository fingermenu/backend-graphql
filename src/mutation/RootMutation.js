// @flow

import { GraphQLObjectType } from 'graphql';
import addRestaurant from './AddRestaurant';

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addRestaurant,
  },
});
