// @flow

import { RestaurantService } from '@fingermenu/parse-server-common';
import Dataloader from 'dataloader';

const restaurantLoaderById = new Dataloader(async ids => {
  const restaurants = await new RestaurantService().search(Map({ ids }));

  return ids.map(id => restaurants.find(restaurant => restaurant.get('id').localeCompare(id) === 0));
});

export default restaurantLoaderById;
