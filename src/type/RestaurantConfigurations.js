// @flow

import { GraphQLList, GraphQLObjectType, GraphQLNonNull } from 'graphql';
import RestaurantImages from './RestaurantImages';
import Printer from './Printer';

export default new GraphQLObjectType({
  name: 'RestaurantConfigurations',
  fields: {
    images: {
      type: RestaurantImages,
      resolve: _ => (_.get('images') ? _.get('images') : null),
    },
    printers: {
      type: new GraphQLList(new GraphQLNonNull(Printer)),
      resolve: _ => (_.get('printers') ? _.get('printers').toArray() : []),
    },
  },
});
