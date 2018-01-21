// @flow

import Dataloader from 'dataloader';
import { RestaurantService } from '@fingermenu/parse-server-common';

const restaurantLoaderById = new Dataloader(async (ids) => {
  const restaurantService = new RestaurantService();

  return Promise.all(ids.map(async id => restaurantService.read(id, null)));
});

export default restaurantLoaderById;
