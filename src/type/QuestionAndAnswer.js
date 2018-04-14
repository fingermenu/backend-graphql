// @flow

import { GraphQLString, GraphQLObjectType } from 'graphql';

export default new GraphQLObjectType({
  name: 'QuestionAndAnswer',
  fields: {
    question: {
      type: GraphQLString,
      resolve: _ => _.get('question'),
    },
    answer: {
      type: GraphQLString,
      resolve: _ => _.get('answer'),
    },
  },
});
