// @flow

import { MenuItemPriceService } from '@fingermenu/parse-server-common';
import Dataloader from 'dataloader';

const menuItemPriceLoaderById = new Dataloader(async ids => {
  const menuItemPrices = await new MenuItemPriceService().search(Map({ ids }));

  return ids.map(id => menuItemPrices.find(menuItemPrice => menuItemPrice.get('id').localeCompare(id) === 0));
});

export default menuItemPriceLoaderById;
