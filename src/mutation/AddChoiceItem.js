// @flow

import { List, Map } from 'immutable';
import { GraphQLList, GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { ChoiceItemConnection, getChoiceItems } from '../type';
import { addChoiceItem } from './ChoiceItemHelper';
import LanguageStringTuple from './LanguageStringTuple';
import logUserRequest from './RequestLogHelper';

export default mutationWithClientMutationId({
  name: 'AddChoiceItem',
  inputFields: {
    name: { type: new GraphQLNonNull(new GraphQLList(LanguageStringTuple)) },
    description: { type: new GraphQLList(LanguageStringTuple) },
    choiceItemPageUrl: { type: GraphQLString },
    imageUrl: { type: GraphQLString },
  },
  outputFields: {
    choiceItem: {
      type: ChoiceItemConnection.edgeType,
      resolve: _ => _.get('choiceItem'),
    },
  },
  mutateAndGetPayload: async (args, { dataLoaders, sessionToken, language, fingerMenuContext }) => {
    logUserRequest(fingerMenuContext, 'Mutation - Add Choice Item', dataLoaders, sessionToken);

    const choiceItemId = await addChoiceItem(args, dataLoaders, sessionToken);

    return Map({
      choiceItem: (await getChoiceItems(Map({ ChoiceItemIds: List.of(choiceItemId) }), dataLoaders, sessionToken, language)).edges[0],
    });
  },
});
