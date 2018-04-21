// @flow

import { SizeService } from '@fingermenu/parse-server-common';
import { List, Map } from 'immutable';
import Dataloader from 'dataloader';

const sizeLoaderById = new Dataloader(async ids => {
  const sizes = await new SizeService().search(Map({ ids: List(ids), limit: 1000, skip: 0 }));

  return ids.map(id => sizes.find(size => size.get('id').localeCompare(id) === 0));
});

export default sizeLoaderById;
