// @flow

import { Map } from 'immutable';
import { GraphQLID, GraphQLInt, GraphQLList, GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { Table } from '../type';
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
  },
  outputFields: {
    errorMessage: {
      type: GraphQLString,
      resolve: _ => _.get('errorMessage'),
    },
    table: {
      type: Table,
      resolve: _ => _.get('table'),
    },
  },
  mutateAndGetPayload: async (args, { dataLoaders, sessionToken }) => {
    try {
      return Map({
        table: await updateTable(args, dataLoaders, sessionToken),
      });
    } catch (ex) {
      return Map({ errorMessage: ex instanceof Error ? ex.message : ex });
    }
  },
});
