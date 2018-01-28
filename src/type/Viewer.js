// @flow

import Immutable from 'immutable';
import { GraphQLID, GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLList } from 'graphql';
import { connectionArgs } from 'graphql-relay';
import { NodeInterface } from '../interface';
import Language from './Language';
import LanguageConnection, { getLanguages } from './LanguageConnection';
import OrderState from './OrderState';
import OrderStateConnection, { getOrderStates } from './OrderStateConnection';
import TableState from './TableState';
import TableStateConnection, { getTableStates } from './TableStateConnection';

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
      resolve: async (_, { languageId }, { dataLoaders }) => (languageId ? dataLoaders.languageLoaderById.load(languageId) : null),
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
      resolve: async (_, args, { sessionToken }) => getLanguages(Immutable.fromJS(args), sessionToken),
    },
    orderState: {
      type: OrderState,
      args: {
        orderStateId: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve: async (_, { orderStateId }, { dataLoaders }) => (orderStateId ? dataLoaders.orderStateLoaderById.load(orderStateId) : null),
    },
    orderStates: {
      type: OrderStateConnection.connectionType,
      args: {
        ...connectionArgs,
        orderStateIds: {
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
      resolve: async (_, args, { sessionToken, language }) => getOrderStates(Immutable.fromJS(args), sessionToken, language),
    },
    tableState: {
      type: TableState,
      args: {
        tableStateId: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve: async (_, { tableStateId }, { dataLoaders }) => (tableStateId ? dataLoaders.tableStateLoaderById.load(tableStateId) : null),
    },
    tableStates: {
      type: TableStateConnection.connectionType,
      args: {
        ...connectionArgs,
        tableStateIds: {
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
      resolve: async (_, args, { sessionToken, language }) => getTableStates(Immutable.fromJS(args), sessionToken, language),
    },
  },
  interfaces: [NodeInterface],
});
