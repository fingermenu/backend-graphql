// @flow

import Dataloader from 'dataloader';
import { TableService } from '@fingermenu/parse-server-common';

const tableLoaderById = new Dataloader(async (ids) => {
  const tableService = new TableService();

  return Promise.all(ids.map(async id => tableService.read(id, null)));
});

export default tableLoaderById;
