// @flow

import { Map } from 'immutable';
import { GraphQLObjectType } from 'graphql';
import ViewerType from './Viewer';
import UserType from './User';
import { NodeField } from '../interface';
import { logUserRequest } from '../mutation';

export default new GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: UserType,
      resolve: async (_, args, { sessionToken, dataLoaders, fingerMenuContext }) => {
        const userId = (await dataLoaders.userLoaderBySessionToken.load(sessionToken)).id;

        logUserRequest(fingerMenuContext, 'Query - User', dataLoaders, sessionToken);

        return Map({ id: userId });
      },
    },
    viewer: {
      type: ViewerType,
      resolve: async (_, args, { sessionToken, dataLoaders, fingerMenuContext }) => {
        logUserRequest(fingerMenuContext, 'Query - Viewer', dataLoaders, sessionToken);

        return Map({ id: 'ViewerId' });
      },
    },
    node: NodeField,
  },
});
