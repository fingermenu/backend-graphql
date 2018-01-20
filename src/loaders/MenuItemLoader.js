// @flow

import { digest } from 'json-hash';
import Dataloader from 'dataloader';
import { MenuItemService } from '@fingermenu/parse-server-common';

const menuItemLoaderById = new Dataloader(
  async (keys) => {
    const menuItemService = new MenuItemService();

    return Promise.all(keys.map(async key => menuItemService.read(key.id, null, key.sessionToken)));
  },
  { cacheKeyFn: digest },
);

export default menuItemLoaderById;
