// @flow

import { List, Map } from 'immutable';
import { GraphQLID, GraphQLString, GraphQLList, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { UserFeedbackConnection, getUserFeedbacks } from '../type';
import { addUserFeedback } from './UserFeedbackHelper';
import QuestionAndAnswer from './QuestionAndAnswer';
import logUserRequest from './RequestLogHelper';

export default mutationWithClientMutationId({
  name: 'SubmitUserFeedback',
  inputFields: {
    questionAndAnswers: { type: new GraphQLList(new GraphQLNonNull(QuestionAndAnswer)) },
    others: { type: GraphQLString },
    restaurantId: { type: GraphQLID },
  },
  outputFields: {
    userFeedback: {
      type: UserFeedbackConnection.edgeType,
      resolve: _ => _.get('userFeedback'),
    },
  },
  mutateAndGetPayload: async (args, { dataLoaders, sessionToken, fingerMenuContext }) => {
    logUserRequest(fingerMenuContext, 'Mutation - Submit User Feedback', dataLoaders, sessionToken);

    const userFeedbackId = await addUserFeedback(args, dataLoaders, sessionToken);

    return Map({
      userFeedback: (await getUserFeedbacks(Map({ userFeedbackIds: List.of(userFeedbackId) }), sessionToken)).edges[0],
    });
  },
});
