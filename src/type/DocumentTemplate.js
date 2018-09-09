// @flow

import { GraphQLFloat, GraphQLList, GraphQLString, GraphQLObjectType, GraphQLNonNull } from 'graphql';
import LinkedPrinter from './LinkedPrinter';

export default new GraphQLObjectType({
  name: 'DocumentTemplate',
  fields: {
    name: {
      type: GraphQLString,
      resolve: _ => _.get('name'),
    },
    maxLineWidthDivisionFactor: {
      type: GraphQLFloat,
      resolve: _ => {
        const maxLineWidthDivisionFactor = _.get('maxLineWidthDivisionFactor');

        return maxLineWidthDivisionFactor ? maxLineWidthDivisionFactor : 1.0;
      },
    },
    template: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: _ => _.get('template'),
    },
    linkedPrinters: {
      type: new GraphQLList(new GraphQLNonNull(LinkedPrinter)),
      resolve: _ => (_.get('linkedPrinters') ? _.get('linkedPrinters').toArray() : []),
    },
  },
});
