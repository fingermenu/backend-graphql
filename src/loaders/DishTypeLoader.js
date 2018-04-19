// @flow

import { DishTypeService } from '@fingermenu/parse-server-common';
import Dataloader from 'dataloader';

const dishTypeLoaderById = new Dataloader(async ids => {
  const dishTypes = await new DishTypeService().search(Map({ ids }));

  return ids.map(id => dishTypes.find(dishType => dishType.get('id').localeCompare(id) === 0));
});

export default dishTypeLoaderById;
