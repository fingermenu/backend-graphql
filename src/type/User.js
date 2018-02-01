// @flow

import Immutable from 'immutable';
import { GraphQLBoolean, GraphQLID, GraphQLInt, GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLList } from 'graphql';
import { connectionArgs } from 'graphql-relay';
import { NodeInterface } from '../interface';
import Tag from './Tag';
import TagConnection, { getTags } from './TagConnection';
import Size from './Size';
import SizeConnection, { getSizes } from './SizeConnection';
import Menu from './Menu';
import MenuConnection, { getMenus } from './MenuConnection';
import ChoiceItem from './ChoiceItem';
import ChoiceItemConnection, { getChoiceItems } from './ChoiceItemConnection';
import ChoiceItemPrice from './ChoiceItemPrice';
import ChoiceItemPriceConnection, { getChoiceItemPrices } from './ChoiceItemPriceConnection';
import MenuItem from './MenuItem';
import MenuItemConnection, { getMenuItems } from './MenuItemConnection';
import MenuItemPrice from './MenuItemPrice';
import MenuItemPriceConnection, { getMenuItemPrices } from './MenuItemPriceConnection';
import Restaurant from './Restaurant';
import RestaurantConnection, { getRestaurants } from './RestaurantConnection';
import Table, { getTable } from './Table';
import TableConnection, { getTables } from './TableConnection';
import Order, { getOrder } from './Order';
import OrderConnection, { getOrders } from './OrderConnection';

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
      resolve: async (_, { tagId }, { dataLoaders }) => (tagId ? dataLoaders.tagLoaderById.load(tagId) : null),
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
      resolve: async (_, { sizeId }, { dataLoaders }) => (sizeId ? dataLoaders.sizeLoaderById.load(sizeId) : null),
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
      resolve: async (_, { menuId }, { dataLoaders }) => (menuId ? dataLoaders.menuLoaderById.load(menuId) : null),
    },
    menus: {
      type: MenuConnection.connectionType,
      args: {
        ...connectionArgs,
        menuIds: {
          type: new GraphQLList(new GraphQLNonNull(GraphQLID)),
        },
        restaurantId: {
          type: GraphQLID,
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
      resolve: async (_, { choiceItemId }, { dataLoaders }) => (choiceItemId ? dataLoaders.choiceItemLoaderById.load(choiceItemId) : null),
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
      resolve: async (_, { choiceItemPriceId }, { dataLoaders }) =>
        (choiceItemPriceId ? dataLoaders.choiceItemPriceLoaderById.load(choiceItemPriceId) : null),
    },
    choiceItemPrices: {
      type: ChoiceItemPriceConnection.connectionType,
      args: {
        ...connectionArgs,
        choiceItemPriceIds: {
          type: new GraphQLList(new GraphQLNonNull(GraphQLID)),
        },
        menuItemPriceId: {
          type: GraphQLID,
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
      resolve: async (_, { menuItemId }, { dataLoaders }) => (menuItemId ? dataLoaders.menuItemLoaderById.load(menuItemId) : null),
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
      resolve: async (_, { menuItemPriceId }, { dataLoaders }) =>
        (menuItemPriceId ? dataLoaders.menuItemPriceLoaderById.load(menuItemPriceId) : null),
    },
    menuItemPrices: {
      type: MenuItemPriceConnection.connectionType,
      args: {
        ...connectionArgs,
        menuItemPriceIds: {
          type: new GraphQLList(new GraphQLNonNull(GraphQLID)),
        },
        menuId: {
          type: GraphQLID,
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
      resolve: async (_, { restaurantId }, { dataLoaders }) => (restaurantId ? dataLoaders.restaurantLoaderById.load(restaurantId) : null),
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
        restaurantId: {
          type: new GraphQLNonNull(GraphQLID),
        },
        name: {
          type: GraphQLString,
        },
        customerName: {
          type: GraphQLString,
        },
        notes: {
          type: GraphQLString,
        },
        tableState: {
          type: GraphQLString,
        },
        sortOption: {
          type: GraphQLString,
        },
      },
      resolve: async (_, args, { dataLoaders, sessionToken, language }) => getTables(Immutable.fromJS(args), dataLoaders, sessionToken, language),
    },
    order: {
      type: Order,
      args: {
        orderId: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve: async (_, { orderId }, { sessionToken }) => getOrder(orderId, sessionToken),
    },
    orders: {
      type: OrderConnection.connectionType,
      args: {
        ...connectionArgs,
        orderIds: {
          type: new GraphQLList(new GraphQLNonNull(GraphQLID)),
        },
        restaurantId: {
          type: new GraphQLNonNull(GraphQLID),
        },
        tableId: {
          type: GraphQLID,
        },
        name: {
          type: GraphQLString,
        },
        customerName: {
          type: GraphQLString,
        },
        notes: {
          type: GraphQLString,
        },
        orderState: {
          type: GraphQLString,
        },
        sortOption: {
          type: GraphQLString,
        },
      },
      resolve: async (_, args, { dataLoaders, sessionToken }) => getOrders(Immutable.fromJS(args), dataLoaders, sessionToken),
    },
  },
  interfaces: [NodeInterface],
});
