// @flow

import { Map } from 'immutable';
import Dataloader from 'dataloader';
import { TableStateService } from '@fingermenu/parse-server-common';

export const tableStateLoaderByKey = new Dataloader(async (keys) => {
  const tableStateService = new TableStateService();

  return Promise.all(keys.map(async key => (await tableStateService.search(Map({ conditions: Map({ key }) }))).first()));
});

export const tableStateLoaderById = new Dataloader(async (ids) => {
  const tableStateService = new TableStateService();

  return Promise.all(ids.map(async id => tableStateService.read(id, null)));
});
