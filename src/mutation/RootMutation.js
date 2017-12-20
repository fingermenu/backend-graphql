// @flow

import { GraphQLObjectType } from 'graphql';
import addMenuItem from './AddMenuItem';
import addRestaurant from './AddRestaurant';

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addMenuItem,
    addRestaurant,
  },
});
