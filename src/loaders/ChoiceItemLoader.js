// @flow

import Dataloader from 'dataloader';
import { ChoiceItemService } from '@fingermenu/parse-server-common';

const choiceItemLoaderById = new Dataloader(async (ids) => {
  const choiceItemService = new ChoiceItemService();

  return Promise.all(ids.map(async id => choiceItemService.read(id, null)));
});

export default choiceItemLoaderById;
