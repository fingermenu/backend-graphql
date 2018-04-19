// @flow

import { MenuItemPriceService } from '@fingermenu/parse-server-common';
import { List, Map } from 'immutable';
import Dataloader from 'dataloader';

const menuItemPriceLoaderById = new Dataloader(async ids => {
  const menuItemPrices = await new MenuItemPriceService().search(Map({ ids: List(ids) }));

  return ids.map(id => menuItemPrices.find(menuItemPrice => menuItemPrice.get('id').localeCompare(id) === 0));
});

export default menuItemPriceLoaderById;
