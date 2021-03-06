// @flow

import { GraphQLBoolean, GraphQLFloat, GraphQLID, GraphQLNonNull, GraphQLInt, GraphQLString, GraphQLObjectType } from 'graphql';
import ChoiceItemPrice from './ChoiceItemPrice';
import Customer from './Customer';

export default new GraphQLObjectType({
  name: 'OrderChoiceItemPrice',
  fields: {
    orderChoiceItemPriceId: {
      type: GraphQLID,
      resolve: _ => _.get('orderChoiceItemPriceId'),
    },
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
    discount: {
      type: GraphQLFloat,
      resolve: _ => _.get('discount'),
    },
    customer: {
      type: Customer,
      resolve: _ => _.get('customer'),
    },
  },
});
