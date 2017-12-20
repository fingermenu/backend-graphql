// @flow

import { List, Map } from 'immutable';
import { GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { ChoiceItemConnection, getChoiceItems } from '../type';
import { addChoiceItem } from './ChoiceItemHelper';

export default mutationWithClientMutationId({
  name: 'AddChoiceItem',
  inputFields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: new GraphQLNonNull(GraphQLString) },
    choiceItemPageUrl: { type: GraphQLString },
    imageUrl: { type: GraphQLString },
  },
  outputFields: {
    errorMessage: {
      type: GraphQLString,
      resolve: _ => _.get('errorMessage'),
    },
    restaurant: {
      type: ChoiceItemConnection.edgeType,
      resolve: _ => _.get('ChoiceItem'),
    },
  },
  mutateAndGetPayload: async (args, { sessionToken, dataLoaders }) => {
    try {
      const restaurantId = await addChoiceItem(args, dataLoaders, sessionToken);

      return Map({
        ChoiceItem: (await getChoiceItems(Map({ ChoiceItemIds: List.of(restaurantId) }), dataLoaders, sessionToken)).edges[0],
      });
    } catch (ex) {
      return Map({ errorMessage: ex instanceof Error ? ex.message : ex });
    }
  },
});
