// @flow

import { GraphQLObjectType } from 'graphql';
import addChoiceItem from './AddChoiceItem';
import addMenuItem from './AddMenuItem';
import addRestaurant from './AddRestaurant';

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addChoiceItem,
    addMenuItem,
    addRestaurant,
  },
});
