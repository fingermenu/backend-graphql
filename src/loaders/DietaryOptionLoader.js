// @flow

import Dataloader from 'dataloader';
import { DietaryOptionService } from '@fingermenu/parse-server-common';

const dietaryOptionLoaderById = new Dataloader(async ids => {
  const dietaryOptionService = new DietaryOptionService();

  return Promise.all(ids.map(async id => dietaryOptionService.read(id, null)));
});

export default dietaryOptionLoaderById;
