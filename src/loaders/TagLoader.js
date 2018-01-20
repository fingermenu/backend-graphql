// @flow

import { digest } from 'json-hash';
import Dataloader from 'dataloader';
import { TagService } from '@fingermenu/parse-server-common';

const tagLoaderById = new Dataloader(
  async (keys) => {
    const tagService = new TagService();

    return Promise.all(keys.map(async key => tagService.read(key.id, null, key.sessionToken)));
  },
  { cacheKeyFn: digest },
);

export default tagLoaderById;
