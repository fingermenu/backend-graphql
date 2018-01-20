// @flow

import Dataloader from 'dataloader';
import { MenuItemPriceService } from '@fingermenu/parse-server-common';

const menuItemPriceLoaderById = new Dataloader(async (ids) => {
  const menuItemPriceService = new MenuItemPriceService();

  return Promise.all(ids.map(async id => menuItemPriceService.read(id, null)));
});

export default menuItemPriceLoaderById;
