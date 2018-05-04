// @flow

import { Map } from 'immutable';
import { GraphQLString, GraphQLObjectType } from 'graphql';
import ViewerType from './Viewer';
import UserType from './User';
import { NodeField } from '../interface';
import { logUserRequest } from '../mutation';

export default new GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: UserType,
      args: {
        appVersion: { type: GraphQLString },
      },
      resolve: async (_, args, { sessionToken, dataLoaders }) => {
        const userId = (await dataLoaders.userLoaderBySessionToken.load(sessionToken)).id;

        logUserRequest(args, 'Query - User', dataLoaders, sessionToken);

        return Map({ id: userId });
      },
    },
    viewer: {
      type: ViewerType,
      args: {
        appVersion: { type: GraphQLString },
      },
      resolve: async (_, args, { sessionToken, dataLoaders }) => {
        logUserRequest(args, 'Query - Viewer', dataLoaders, sessionToken);

        return Map({ id: 'ViewerId' });
      },
    },
    node: NodeField,
  },
});
