// @flow

import { MenuService } from '@fingermenu/parse-server-common';
import { Map } from 'immutable';
import Dataloader from 'dataloader';

const menuLoaderById = new Dataloader(async ids => {
  const menus = await new MenuService().search(Map({ ids }));

  return ids.map(id => menus.find(menu => menu.get('id').localeCompare(id) === 0));
});

export default menuLoaderById;
