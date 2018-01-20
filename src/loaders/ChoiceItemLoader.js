// @flow

import { digest } from 'json-hash';
import Dataloader from 'dataloader';
import { ChoiceItemService } from '@fingermenu/parse-server-common';

const choiceItemLoaderById = new Dataloader(
  async (keys) => {
    const choiceItemService = new ChoiceItemService();

    return Promise.all(keys.map(async key => choiceItemService.read(key.id, null, key.sessionToken)));
  },
  { cacheKeyFn: digest },
);

export default choiceItemLoaderById;
