// @flow

import { ChoiceItemPriceService } from '@fingermenu/parse-server-common';
import { GraphQLID, GraphQLInt, GraphQLList, GraphQLFloat, GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import { NodeInterface } from '../interface';
import ChoiceItem from './ChoiceItem';
import Tag from './Tag';

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
      resolve: async (_, args, { dataLoaders: { choiceItemLoaderById } }) =>
        _.get('choiceItemId') ? choiceItemLoaderById.load(_.get('choiceItemId')) : null,
    },
    sortOrderIndex: {
      type: GraphQLInt,
      resolve: _ => _.get('sortOrderIndex'),
    },
    tags: {
      type: new GraphQLList(new GraphQLNonNull(Tag)),
      resolve: async (_, args, { dataLoaders: { tagLoaderById } }) => tagLoaderById.loadMany(_.get('tagIds').toArray()),
    },
  },
  interfaces: [NodeInterface],
});
