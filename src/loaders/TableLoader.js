// @flow

import { TableService } from '@fingermenu/parse-server-common';
import Dataloader from 'dataloader';

const tableLoaderById = new Dataloader(async ids => {
  const tables = await new TableService().search(Map({ ids }));

  return ids.map(id => tables.find(table => table.get('id').localeCompare(id) === 0));
});

export default tableLoaderById;
