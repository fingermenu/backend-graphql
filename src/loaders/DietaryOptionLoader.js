// @flow

import { DietaryOptionService } from '@fingermenu/parse-server-common';
import { List, Map } from 'immutable';
import Dataloader from 'dataloader';

const dietaryOptionLoaderById = new Dataloader(async ids => {
  const dietaryOptions = await new DietaryOptionService().search(Map({ ids: List(ids), limit: 1000, skip: 0 }));

  return ids.map(id => dietaryOptions.find(dietaryOption => dietaryOption.get('id').localeCompare(id) === 0));
});

export default dietaryOptionLoaderById;
