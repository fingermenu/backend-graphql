// @flow

import { ChoiceItemPriceService } from '@fingermenu/parse-server-common';
import { List, Map } from 'immutable';
import Dataloader from 'dataloader';

const choiceItemPriceLoaderById = new Dataloader(async ids => {
  const choiceItemPrices = await new ChoiceItemPriceService().search(Map({ ids: List(ids), limit: 1000, skip: 0 }));

  return ids.map(id => choiceItemPrices.find(choiceItemPrice => choiceItemPrice.get('id').localeCompare(id) === 0));
});

export default choiceItemPriceLoaderById;
