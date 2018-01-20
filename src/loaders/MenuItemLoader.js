// @flow

import Dataloader from 'dataloader';
import { MenuItemService } from '@fingermenu/parse-server-common';

const menuItemLoaderById = new Dataloader(async (ids) => {
  const menuItemService = new MenuItemService();

  return Promise.all(ids.map(async id => menuItemService.read(id, null)));
});

export default menuItemLoaderById;
