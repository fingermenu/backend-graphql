// @flow

import { digest } from 'json-hash';
import Dataloader from 'dataloader';
import { SizeService } from '@fingermenu/parse-server-common';

const sizeLoaderById = new Dataloader(
  async (keys) => {
    const sizeService = new SizeService();

    return Promise.all(keys.map(async key => sizeService.read(key.id, null, key.sessionToken)));
  },
  { cacheKeyFn: digest },
);

export default sizeLoaderById;
