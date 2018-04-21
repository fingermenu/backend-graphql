// @flow

import { DishTypeService } from '@fingermenu/parse-server-common';
import { List, Map } from 'immutable';
import Dataloader from 'dataloader';

const dishTypeLoaderById = new Dataloader(async ids => {
  const dishTypes = await new DishTypeService().search(Map({ ids: List(ids), limit: 1000, skip: 0 }));

  return ids.map(id => dishTypes.find(dishType => dishType.get('id').localeCompare(id) === 0));
});

export default dishTypeLoaderById;
