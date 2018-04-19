// @flow

import { ChoiceItemPriceService } from '@fingermenu/parse-server-common';
import { Map } from 'immutable';
import Dataloader from 'dataloader';

const choiceItemPriceLoaderById = new Dataloader(async ids => {
  const choiceItemPrices = await new ChoiceItemPriceService().search(Map({ ids }));

  return ids.map(id => choiceItemPrices.find(choiceItemPrice => choiceItemPrice.get('id').localeCompare(id) === 0));
});

export default choiceItemPriceLoaderById;
