// @flow

import { ServingTimeService } from '@fingermenu/parse-server-common';
import Dataloader from 'dataloader';

const servingTimeLoaderById = new Dataloader(async ids => {
  const servingTimes = await new ServingTimeService().search(Map({ ids }));

  return ids.map(id => servingTimes.find(servingTime => servingTime.get('id').localeCompare(id) === 0));
});

export default servingTimeLoaderById;
