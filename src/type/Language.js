// @flow

import { LanguageService } from '@fingermenu/parse-server-common';
import { GraphQLID, GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import { NodeInterface } from '../interface';

export const getLanguage = async (languageId, sessionToken) => new LanguageService().read(languageId, null, sessionToken);

export default new GraphQLObjectType({
  name: 'Language',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: _ => _.get('id'),
    },
    key: {
      type: GraphQLString,
      resolve: _ => _.get('key'),
    },
    name: {
      type: GraphQLString,
      resolve: _ => _.get('name'),
    },
    imageUrl: {
      type: GraphQLString,
      resolve: async _ => _.get('imageUrl'),
    },
  },
  interfaces: [NodeInterface],
});
