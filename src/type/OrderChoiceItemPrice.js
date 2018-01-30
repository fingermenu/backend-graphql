// @flow

import { GraphQLInt, GraphQLObjectType } from 'graphql';
import ChoiceItemPrice from './ChoiceItemPrice';

export default new GraphQLObjectType({
  name: 'OrderChoiceItemPrice',
  fields: {
    quantity: {
      type: GraphQLInt,
      resolve: _ => _.get('quantity'),
    },
    choiceItemPrice: {
      type: ChoiceItemPrice,
      resolve: async (_, args, { dataLoaders }) =>
        (_.get('choiceItemPriceId') ? dataLoaders.choiceItemPriceLoaderById.load(_.get('choiceItemPriceId')) : null),
    },
  },
});
