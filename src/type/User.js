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
import Table from './Table';
import TableConnection, { getTables } from './TableConnection';
import Order, { getOrder } from './Order';
import OrderConnection, { getOrders } from './OrderConnection';
import DateRange from './DateRange';

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
      resolve: async (_, { tagId }, { dataLoaders: { tagLoaderById } }) => (tagId ? tagLoaderById.load(tagId) : null),
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
      resolve: async (_, args, { dataLoaders, sessionToken, language }) => getTags(Immutable.fromJS(args), dataLoaders, sessionToken, language),
    },
    size: {
      type: Size,
      args: {
        sizeId: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve: async (_, { sizeId }, { dataLoaders: { sizeLoaderById } }) => (sizeId ? sizeLoaderById.load(sizeId) : null),
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
      resolve: async (_, args, { dataLoaders, sessionToken, language }) => getSizes(Immutable.fromJS(args), dataLoaders, sessionToken, language),
    },
    menu: {
      type: Menu,
      args: {
        menuId: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve: async (_, { menuId }, { dataLoaders: { menuLoaderById } }) => (menuId ? menuLoaderById.load(menuId) : null),
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

      resolve: async (_, args, { dataLoaders, sessionToken, language }) => getMenus(Immutable.fromJS(args), dataLoaders, sessionToken, language),
    },
    choiceItem: {
      type: ChoiceItem,
      args: {
        choiceItemId: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve: async (_, { choiceItemId }, { dataLoaders: { choiceItemLoaderById } }) =>
        choiceItemId ? choiceItemLoaderById.load(choiceItemId) : null,
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
      resolve: async (_, { choiceItemPriceId }, { dataLoaders: { choiceItemPriceLoaderById } }) =>
        choiceItemPriceId ? choiceItemPriceLoaderById.load(choiceItemPriceId) : null,
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
      resolve: async (_, { menuItemId }, { dataLoaders: { menuItemLoaderById } }) => (menuItemId ? menuItemLoaderById.load(menuItemId) : null),
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
      resolve: async (_, { menuItemPriceId }, { dataLoaders: { menuItemPriceLoaderById } }) =>
        menuItemPriceId ? menuItemPriceLoaderById.load(menuItemPriceId) : null,
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
      resolve: async (_, { restaurantId }, { dataLoaders: { restaurantLoaderById } }) =>
        restaurantId ? restaurantLoaderById.load(restaurantId) : null,
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
      resolve: async (_, { tableId }, { dataLoaders: { tableLoaderById } }) => (tableId ? tableLoaderById.load(tableId) : null),
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
        lastOrderCorrelationId: {
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
        correlationId: {
          type: GraphQLID,
        },
        restaurantId: {
          type: new GraphQLNonNull(GraphQLID),
        },
        dateRange: {
          type: DateRange,
        },
        includeCancelledOrders: {
          type: GraphQLBoolean,
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
        sortOption: {
          type: GraphQLString,
        },
      },
      resolve: async (_, args, { sessionToken }) => getOrders(Immutable.fromJS(args), sessionToken),
    },
  },
  interfaces: [NodeInterface],
});
