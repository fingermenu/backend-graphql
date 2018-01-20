// @flow

import Immutable from 'immutable';
import { GraphQLBoolean, GraphQLID, GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLList } from 'graphql';
import { connectionArgs } from 'graphql-relay';
import { NodeInterface } from '../interface';
import Menu, { getMenu } from './Menu';
import MenuConnection, { getMenus } from './MenuConnection';
import ChoiceItem, { getChoiceItem } from './ChoiceItem';
import ChoiceItemConnection, { getChoiceItems } from './ChoiceItemConnection';
import MenuItem, { getMenuItem } from './MenuItem';
import MenuItemConnection, { getMenuItems } from './MenuItemConnection';
import Restaurant, { getRestaurant } from './Restaurant';
import RestaurantConnection, { getRestaurants } from './RestaurantConnection';

export default new GraphQLObjectType({
  name: 'User',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: _ => _.get('id'),
    },
    menu: {
      type: Menu,
      args: {
        menuId: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve: async (_, { menuId }, { sessionToken }) => getMenu(menuId, sessionToken),
    },
    menus: {
      type: MenuConnection.connectionType,
      args: {
        ...connectionArgs,
        menuIds: {
          type: new GraphQLList(new GraphQLNonNull(GraphQLID)),
        },
        name: {
          type: GraphQLString,
        },
        description: {
          type: GraphQLString,
        },
        sortOption: {
          type: GraphQLString,
        },
      },
      resolve: async (_, args, { sessionToken }) => getMenus(Immutable.fromJS(args), sessionToken),
    },
    choiceItem: {
      type: ChoiceItem,
      args: {
        choiceItemId: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve: async (_, { choiceItemId }, { sessionToken }) => getChoiceItem(choiceItemId, sessionToken),
    },
    choiceItems: {
      type: ChoiceItemConnection.connectionType,
      args: {
        ...connectionArgs,
        choiceItemIds: {
          type: new GraphQLList(new GraphQLNonNull(GraphQLID)),
        },
        name: {
          type: GraphQLString,
        },
        description: {
          type: GraphQLString,
        },
        sortOption: {
          type: GraphQLString,
        },
      },
      resolve: async (_, args, { dataLoaders, sessionToken, language }) =>
        getChoiceItems(Immutable.fromJS(args), dataLoaders, sessionToken, language),
    },
    menuItem: {
      type: MenuItem,
      args: {
        menuItemId: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve: async (_, { menuItemId }, { sessionToken }) => getMenuItem(menuItemId, sessionToken),
    },
    menuItems: {
      type: MenuItemConnection.connectionType,
      args: {
        ...connectionArgs,
        menuItemIds: {
          type: new GraphQLList(new GraphQLNonNull(GraphQLID)),
        },
        name: {
          type: GraphQLString,
        },
        description: {
          type: GraphQLString,
        },
        sortOption: {
          type: GraphQLString,
        },
      },
      resolve: async (_, args, { sessionToken }) => getMenuItems(Immutable.fromJS(args), sessionToken),
    },
    restaurant: {
      type: Restaurant,
      args: {
        restaurantId: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve: async (_, { restaurantId }, { sessionToken }) => getRestaurant(restaurantId, sessionToken),
    },
    restaurants: {
      type: RestaurantConnection.connectionType,
      args: {
        ...connectionArgs,
        restaurantIds: {
          type: new GraphQLList(new GraphQLNonNull(GraphQLID)),
        },
        name: {
          type: GraphQLString,
        },
        status: {
          type: GraphQLBoolean,
        },
        inheritParentRestaurantMenus: {
          type: GraphQLBoolean,
        },
        sortOption: {
          type: GraphQLString,
        },
      },
      resolve: async (_, args, { dataLoaders, sessionToken, language }) =>
        getRestaurants(Immutable.fromJS(args), dataLoaders, sessionToken, language),
    },
  },
  interfaces: [NodeInterface],
});
