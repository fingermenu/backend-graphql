// @flow

import Immutable from 'immutable';
import { GraphQLID, GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLList } from 'graphql';
import { connectionArgs } from 'graphql-relay';
import { NodeInterface } from '../interface';
import Language, { getLanguage } from './Language';
import LanguageConnection, { getLanguages } from './LanguageConnection';

export default new GraphQLObjectType({
  name: 'Viewer',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: _ => _.get('id'),
    },
    language: {
      type: Language,
      args: {
        languageId: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve: async (_, { languageId }) => getLanguage(languageId),
    },
    languages: {
      type: LanguageConnection.connectionType,
      args: {
        ...connectionArgs,
        languageIds: {
          type: new GraphQLList(new GraphQLNonNull(GraphQLID)),
        },
        key: {
          type: GraphQLString,
        },
        name: {
          type: GraphQLString,
        },
        sortOption: {
          type: GraphQLString,
        },
      },
      resolve: async (_, args) => getLanguages(Immutable.fromJS(args)),
    },
  },
  interfaces: [NodeInterface],
});
