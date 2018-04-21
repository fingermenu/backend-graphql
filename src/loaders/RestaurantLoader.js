// @flow

import { RestaurantService } from '@fingermenu/parse-server-common';
import { List, Map } from 'immutable';
import Dataloader from 'dataloader';

const restaurantLoaderById = new Dataloader(async ids => {
  const restaurants = await new RestaurantService().search(Map({ ids: List(ids), limit: 1000, skip: 0 }));

  return ids.map(id => restaurants.find(restaurant => restaurant.get('id').localeCompare(id) === 0));
});

export default restaurantLoaderById;
