// @flow

import { MenuItemService } from '@fingermenu/parse-server-common';
import Dataloader from 'dataloader';

const menuItemLoaderById = new Dataloader(async ids => {
  const menuItems = await new MenuItemService().search(Map({ ids }));

  return ids.map(id => menuItems.find(menuItem => menuItem.get('id').localeCompare(id) === 0));
});

export default menuItemLoaderById;
