// @flow

import { SizeService } from '@fingermenu/parse-server-common';
import { Map } from 'immutable';
import Dataloader from 'dataloader';

const sizeLoaderById = new Dataloader(async ids => {
  const sizes = await new SizeService().search(Map({ ids }));

  return ids.map(id => sizes.find(size => size.get('id').localeCompare(id) === 0));
});

export default sizeLoaderById;
