// @flow

import { List, Map } from 'immutable';
import { GraphQLList, GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { ChoiceItemConnection, getChoiceItems } from '../type';
import { addChoiceItem } from './ChoiceItemHelper';
import LanguageStringTuple from './LanguageStringTuple';

export default mutationWithClientMutationId({
  name: 'AddChoiceItem',
  inputFields: {
    name: { type: new GraphQLNonNull(new GraphQLList(LanguageStringTuple)) },
    description: { type: new GraphQLList(LanguageStringTuple) },
    choiceItemPageUrl: { type: GraphQLString },
    imageUrl: { type: GraphQLString },
  },
  outputFields: {
    errorMessage: {
      type: GraphQLString,
      resolve: _ => _.get('errorMessage'),
    },
    choiceItem: {
      type: ChoiceItemConnection.edgeType,
      resolve: _ => _.get('ChoiceItem'),
    },
  },
  mutateAndGetPayload: async (args, { sessionToken, dataLoaders }) => {
    try {
      const choiceItemId = await addChoiceItem(args, dataLoaders, sessionToken);

      return Map({
        ChoiceItem: (await getChoiceItems(Map({ ChoiceItemIds: List.of(choiceItemId) }), dataLoaders, sessionToken)).edges[0],
      });
    } catch (ex) {
      return Map({ errorMessage: ex instanceof Error ? ex.message : ex });
    }
  },
});
