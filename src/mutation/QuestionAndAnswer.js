// @flow

import { GraphQLString, GraphQLInputObjectType } from 'graphql';

export default new GraphQLInputObjectType({
  name: 'QuestionAndAnswerInput',
  fields: {
    question: { type: GraphQLString },
    answer: { type: GraphQLString },
  },
});
