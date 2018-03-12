// @flow

import { List, Map } from 'immutable';
import { GraphQLID, GraphQLInt, GraphQLList, GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { TableConnection, getTables } from '../type';
import updateTable from './TableHelper';
import LanguageStringTuple from './LanguageStringTuple';

export default mutationWithClientMutationId({
  name: 'UpdateTable',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLList(LanguageStringTuple) },
    status: { type: GraphQLString },
    tableState: { type: GraphQLString },
    numberOfAdults: { type: GraphQLInt },
    numberOfChildren: { type: GraphQLInt },
    customerName: { type: GraphQLString },
    notes: { type: GraphQLString },
    lastOrderCorelationId: { type: GraphQLID },
  },
  outputFields: {
    errorMessage: {
      type: GraphQLString,
      resolve: _ => _.get('errorMessage'),
    },
    table: {
      type: TableConnection.edgeType,
      resolve: _ => _.get('table'),
    },
  },
  mutateAndGetPayload: async (args, { dataLoaders, sessionToken, language }) => {
    try {
      await updateTable(args, dataLoaders, sessionToken);

      return Map({
        table: (await getTables(Map({ tableIds: List.of(args.id) }), dataLoaders, sessionToken, language)).edges[0],
      });
    } catch (ex) {
      return Map({ errorMessage: ex instanceof Error ? ex.message : ex });
    }
  },
});
