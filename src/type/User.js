// @flow

import Immutable from 'immutable';
import { GraphQLBoolean, GraphQLID, GraphQLInt, GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLList } from 'graphql';
import { connectionArgs } from 'graphql-relay';
import { NodeInterface } from '../interface';
import Tag, { getTag } from './Tag';
import TagConnection, { getTags } from './TagConnection';
import Size, { getSize } from './Size';
import SizeConnection, { getSizes } from './SizeConnection';
import Menu, { getMenu } from './Menu';
import MenuConnection, { getMenus } from './MenuConnection';
import ChoiceItem, { getChoiceItem } from './ChoiceItem';
import ChoiceItemConnection, { getChoiceItems } from './ChoiceItemConnection';
import ChoiceItemPrice, { getChoiceItemPrice } from './ChoiceItemPrice';
import ChoiceItemPriceConnection, { getChoiceItemPrices } from './ChoiceItemPriceConnection';
import MenuItem, { getMenuItem } from './MenuItem';
import MenuItemConnection, { getMenuItems } from './MenuItemConnection';
import MenuItemPrice, { getMenuItemPrice } from './MenuItemPrice';
import MenuItemPriceConnection, { getMenuItemPrices } from './MenuItemPriceConnection';
import Restaurant, { getRestaurant } from './Restaurant';
import RestaurantConnection, { getRestaurants } from './RestaurantConnection';
import Table, { getTable } from './Table';
import TableConnection, { getTables } from './TableConnection';

export default new GraphQLObjectType({
  name: 'User',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: _ => _.get('id'),
    },
    tag: {
      type: Tag,
      args: {
        tagId: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve: async (_, { tagId }, { sessionToken }) => getTag(tagId, sessionToken),
    },
    tags: {
      type: TagConnection.connectionType,
      args: {
        ...connectionArgs,
        tagIds: {
          type: new GraphQLList(new GraphQLNonNull(GraphQLID)),
        },
        name: {
          type: GraphQLString,
        },
        description: {
          type: GraphQLString,
        },
        level: {
          type: GraphQLInt,
        },
        forDisplay: {
          type: GraphQLBoolean,
        },
        sortOption: {
          type: GraphQLString,
        },
      },
      resolve: async (_, args, { dataloaders, sessionToken, language }) => getTags(Immutable.fromJS(args), dataloaders, sessionToken, language),
    },
    size: {
      type: Size,
      args: {
        sizeId: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve: async (_, { sizeId }, { sessionToken }) => getSize(sizeId, sessionToken),
    },
    sizes: {
      type: SizeConnection.connectionType,
      args: {
        ...connectionArgs,
        sizeIds: {
          type: new GraphQLList(new GraphQLNonNull(GraphQLID)),
        },
        name: {
          type: GraphQLString,
        },
        sortOption: {
          type: GraphQLString,
        },
      },
      resolve: async (_, args, { dataloaders, sessionToken, language }) => getSizes(Immutable.fromJS(args), dataloaders, sessionToken, language),
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

      resolve: async (_, args, { dataloaders, sessionToken, language }) => getMenus(Immutable.fromJS(args), dataloaders, sessionToken, language),
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
    choiceItemPrice: {
      type: ChoiceItemPrice,
      args: {
        choiceItemPriceId: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve: async (_, { choiceItemPriceId }, { sessionToken }) => getChoiceItemPrice(choiceItemPriceId, sessionToken),
    },
    choiceItemPrices: {
      type: ChoiceItemPriceConnection.connectionType,
      args: {
        ...connectionArgs,
        choiceItemPriceIds: {
          type: new GraphQLList(new GraphQLNonNull(GraphQLID)),
        },
        sortOption: {
          type: GraphQLString,
        },
      },
      resolve: async (_, args, { dataLoaders, sessionToken }) => getChoiceItemPrices(Immutable.fromJS(args), dataLoaders, sessionToken),
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
      resolve: async (_, args, { dataLoaders, sessionToken, language }) => getMenuItems(Immutable.fromJS(args), dataLoaders, sessionToken, language),
    },
    menuItemPrice: {
      type: MenuItemPrice,
      args: {
        menuItemPriceId: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve: async (_, { menuItemPriceId }, { sessionToken }) => getMenuItemPrice(menuItemPriceId, sessionToken),
    },
    menuItemPrices: {
      type: MenuItemPriceConnection.connectionType,
      args: {
        ...connectionArgs,
        menuItemPriceIds: {
          type: new GraphQLList(new GraphQLNonNull(GraphQLID)),
        },
        sortOption: {
          type: GraphQLString,
        },
      },
      resolve: async (_, args, { dataLoaders, sessionToken }) => getMenuItemPrices(Immutable.fromJS(args), dataLoaders, sessionToken),
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
    table: {
      type: Table,
      args: {
        tableId: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve: async (_, { tableId }, { sessionToken }) => getTable(tableId, sessionToken),
    },
    tables: {
      type: TableConnection.connectionType,
      args: {
        ...connectionArgs,
        tableIds: {
          type: new GraphQLList(new GraphQLNonNull(GraphQLID)),
        },
        name: {
          type: GraphQLString,
        },
        restaurantId: {
          type: GraphQLID,
        },
        sortOption: {
          type: GraphQLString,
        },
      },
      resolve: async (_, args, { dataLoaders, sessionToken, language }) => getTables(Immutable.fromJS(args), dataLoaders, sessionToken, language),
    },
  },
  interfaces: [NodeInterface],
});
