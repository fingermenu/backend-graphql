// @flow

import { GraphQLBoolean, GraphQLNonNull, GraphQLInt, GraphQLString, GraphQLObjectType } from 'graphql';
import ChoiceItemPrice from './ChoiceItemPrice';

export default new GraphQLObjectType({
  name: 'OrderChoiceItemPrice',
  fields: {
    choiceItemPrice: {
      type: new GraphQLNonNull(ChoiceItemPrice),
      resolve: async (_, args, { dataLoaders }) =>
        _.get('choiceItemPriceId') ? dataLoaders.choiceItemPriceLoaderById.load(_.get('choiceItemPriceId')) : null,
    },
    quantity: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: _ => _.get('quantity'),
    },
    notes: {
      type: GraphQLString,
      resolve: _ => _.get('notes'),
    },
    paid: {
      type: GraphQLBoolean,
      resolve: _ => _.get('paid'),
    },
  },
});
