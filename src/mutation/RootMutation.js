// @flow

import { GraphQLObjectType } from 'graphql';
import addChoiceItem from './AddChoiceItem';
import addMenuItem from './AddMenuItem';
import addRestaurant from './AddRestaurant';
import updateTable from './UpdateTable';
import placeOrder from './PlaceOrder';
import updateOrder from './UpdateOrder';
import cancelOrder from './CancelOrder';
import submitUserFeedback from './SubmitUserFeedback';

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addChoiceItem,
    addMenuItem,
    addRestaurant,
    updateTable,
    placeOrder,
    updateOrder,
    cancelOrder,
    submitUserFeedback,
  },
});
