// @flow

import Dataloader from 'dataloader';
import { SizeService } from '@fingermenu/parse-server-common';

const sizeLoaderById = new Dataloader(async (ids) => {
  const sizeService = new SizeService();

  return Promise.all(ids.map(async id => sizeService.read(id, null)));
});

export default sizeLoaderById;
