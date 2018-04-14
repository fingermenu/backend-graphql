// @flow

import { UserFeedbackService } from '@fingermenu/parse-server-common';
import { GraphQLID, GraphQLList, GraphQLString, GraphQLObjectType, GraphQLNonNull } from 'graphql';
import { NodeInterface } from '../interface';
import QuestionAndAnswer from './QuestionAndAnswer';
import Restaurant from './Restaurant';

export const getUserFeedback = async (serviceTimeId, sessionToken) => new UserFeedbackService().read(serviceTimeId, null, sessionToken);

export default new GraphQLObjectType({
  name: 'UserFeedback',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: _ => _.get('id'),
    },
    questionAndAnswers: {
      type: new GraphQLList(new GraphQLNonNull(QuestionAndAnswer)),
      resolve: _ => (_.get('questionAndAnswers') ? _.get('questionAndAnswers').toArray() : []),
    },
    others: {
      type: GraphQLString,
      resolve: _ => _.get('others'),
    },
    submittedAt: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: _ => _.get('submittedAt').toISOString(),
    },
    restaurant: {
      type: Restaurant,
      resolve: async (_, args, { dataLoaders: { restaurantLoaderById } }) =>
        _.get('restaurantId') ? restaurantLoaderById.load(_.get('restaurantId')) : null,
    },
  },
  interfaces: [NodeInterface],
});
