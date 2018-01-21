// @flow

import Dataloader from 'dataloader';
import { TagService } from '@fingermenu/parse-server-common';

const tagLoaderById = new Dataloader(async (ids) => {
  const tagService = new TagService();

  return Promise.all(ids.map(async id => tagService.read(id, null)));
});

export default tagLoaderById;
