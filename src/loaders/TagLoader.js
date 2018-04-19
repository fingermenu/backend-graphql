// @flow

import { TagService } from '@fingermenu/parse-server-common';
import { Map } from 'immutable';
import Dataloader from 'dataloader';

const tagLoaderById = new Dataloader(async ids => {
  const tags = await new TagService().search(Map({ ids }));

  return ids.map(id => tags.find(tag => tag.get('id').localeCompare(id) === 0));
});

export default tagLoaderById;
