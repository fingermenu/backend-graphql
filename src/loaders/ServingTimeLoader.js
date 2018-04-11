// @flow

import Dataloader from 'dataloader';
import { ServingTimeService } from '@fingermenu/parse-server-common';

const servingTimeLoaderById = new Dataloader(async ids => {
  const servingTimeService = new ServingTimeService();

  return Promise.all(ids.map(async id => servingTimeService.read(id, null)));
});

export default servingTimeLoaderById;
