// @flow

import Dataloader from 'dataloader';
import { DishTypeService } from '@fingermenu/parse-server-common';

const dishTypeLoaderById = new Dataloader(async ids => {
  const dishTypeService = new DishTypeService();

  return Promise.all(ids.map(async id => dishTypeService.read(id, null)));
});

export default dishTypeLoaderById;
