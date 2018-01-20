// @flow

import { digest } from 'json-hash';
import Dataloader from 'dataloader';
import { MenuService } from '@fingermenu/parse-server-common';

const menuLoaderById = new Dataloader(
  async (keys) => {
    const menuService = new MenuService();

    return Promise.all(keys.map(async key => menuService.read(key.id, null, key.sessionToken)));
  },
  { cacheKeyFn: digest },
);

export default menuLoaderById;
