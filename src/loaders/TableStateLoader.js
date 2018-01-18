// @flow

import Dataloader from 'dataloader';
import { TableStateLoader } from '@fingermenu/parse-server-common';

const tableStateLoaderById = new Dataloader(async (ids) => {
  const tableStateLoader = new TableStateLoader();

  return Promise.all(ids.map(async id => tableStateLoader.read(id, null)));
});

export default tableStateLoaderById;
