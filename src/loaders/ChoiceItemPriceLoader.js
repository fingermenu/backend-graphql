// @flow

import Dataloader from 'dataloader';
import { ChoiceItemPriceService } from '@fingermenu/parse-server-common';

const choiceItemPriceLoaderById = new Dataloader(async (ids) => {
  const choiceItemPriceService = new ChoiceItemPriceService();

  return Promise.all(ids.map(async id => choiceItemPriceService.read(id, null)));
});

export default choiceItemPriceLoaderById;
