// @flow

import { ChoiceItemService } from '@fingermenu/parse-server-common';
import Dataloader from 'dataloader';

const choiceItemLoaderById = new Dataloader(async ids => {
  const choiceItems = await new ChoiceItemService().search(Map({ ids }));

  return ids.map(id => choiceItems.find(choiceItem => choiceItem.get('id').localeCompare(id) === 0));
});

export default choiceItemLoaderById;
