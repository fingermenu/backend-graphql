// @flow

import { ServingTimeService } from '@fingermenu/parse-server-common';
import { List, Map } from 'immutable';
import Dataloader from 'dataloader';

const servingTimeLoaderById = new Dataloader(async ids => {
  const servingTimes = await new ServingTimeService().search(Map({ ids: List(ids), limit: 1000, skip: 0 }));

  return ids.map(id => servingTimes.find(servingTime => servingTime.get('id').localeCompare(id) === 0));
});

export default servingTimeLoaderById;
