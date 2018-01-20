// @flow

import Dataloader from 'dataloader';
import { MenuService } from '@fingermenu/parse-server-common';

const menuLoaderById = new Dataloader(async (ids) => {
  const menuService = new MenuService();

  return Promise.all(ids.map(async id => menuService.read(id, null)));
});

export default menuLoaderById;
