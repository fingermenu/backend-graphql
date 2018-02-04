// @flow

import { GraphQLList, GraphQLObjectType, GraphQLNonNull } from 'graphql';
import Printer from './Printer';

export default new GraphQLObjectType({
  name: 'RestaurantConfigurations',
  fields: {
    printers: {
      type: new GraphQLList(new GraphQLNonNull(Printer)),
      resolve: _ => (_.get('printers') ? _.get('printers').toArray() : []),
    },
  },
});
