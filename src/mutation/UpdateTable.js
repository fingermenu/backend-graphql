// @flow

import { List, Map } from 'immutable';
import { GraphQLID, GraphQLList, GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { TableConnection, getTables } from '../type';
import updateTable from './TableHelper';
import LanguageStringTuple from './LanguageStringTuple';
import logUserRequest from './RequestLogHelper';
import Customer from './Customer';

export default mutationWithClientMutationId({
  name: 'UpdateTable',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLList(LanguageStringTuple) },
    customers: { type: new GraphQLList(new GraphQLNonNull(Customer)) },
    status: { type: GraphQLString },
    tableState: { type: GraphQLString },
    notes: { type: GraphQLString },
    lastOrderCorrelationId: { type: GraphQLID },
  },
  outputFields: {
    table: {
      type: TableConnection.edgeType,
      resolve: _ => _.get('table'),
    },
  },
  mutateAndGetPayload: async (args, { dataLoaders, sessionToken, language, fingerMenuContext }) => {
    logUserRequest(fingerMenuContext, 'Mutation - Update Table', dataLoaders, sessionToken);

    await updateTable(args, dataLoaders, sessionToken);

    return Map({
      table: (await getTables(Map({ tableIds: List.of(args.id) }), dataLoaders, sessionToken, language)).edges[0],
    });
  },
});
