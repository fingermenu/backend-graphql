// @flow

import { GraphQLID, GraphQLFloat, GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import { ChoiceItemPriceService } from '@fingermenu/parse-server-common';
import { NodeInterface } from '../interface';
import ChoiceItem from './ChoiceItem';
import Size from './Size';

export const getChoiceItemPrice = async (choiceItemPriceId, sessionToken) => new ChoiceItemPriceService().read(choiceItemPriceId, null, sessionToken);

export default new GraphQLObjectType({
  name: 'ChoiceItemPrice',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: _ => _.get('id'),
    },
    currentPrice: {
      type: GraphQLFloat,
      resolve: async _ => _.get('currentPrice'),
    },
    wasPrice: {
      type: GraphQLFloat,
      resolve: async _ => _.get('wasPrice'),
    },
    validFrom: {
      type: GraphQLString,
      resolve: async _ => _.get('validFrom'),
    },
    validUntil: {
      type: GraphQLString,
      resolve: async _ => _.get('validUntil'),
    },
    choiceItem: {
      type: ChoiceItem,
      resolve: async (_, args, { dataLoaders }) => dataLoaders.choiceItemLoaderById.load(_.get('choiceItemId')),
    },
    size: {
      type: Size,
      resolve: async (_, args, { dataLoaders }) => (_.get('sizeId') ? dataLoaders.sizeLoaderById.load(_.get('sizeId')) : null),
    },
  },
  interfaces: [NodeInterface],
});
