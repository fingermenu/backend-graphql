// @flow

import Dataloader from 'dataloader';
import { OrderStateService } from '@fingermenu/parse-server-common';

export const orderStateLoaderByKey = new Dataloader(async (keys) => {
  const orderStateService = new OrderStateService();

  return Promise.all(keys.map(async key => orderStateService.search(Map({ conditions: Map({ key }) })).first()));
});

export const orderStateLoaderById = new Dataloader(async (ids) => {
  const orderStateService = new OrderStateService();

  return Promise.all(ids.map(async id => orderStateService.read(id, null)));
});
