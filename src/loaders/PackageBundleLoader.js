// @flow

import { PackageBundleService } from '@fingermenu/parse-server-common';
import { Map } from 'immutable';
import Dataloader from 'dataloader';

const packageBundleLoaderByRestaurantId = new Dataloader(async keys => {
  const packageBundleService = new PackageBundleService();

  return Promise.all(
    keys.map(async key => {
      const result = await packageBundleService.search(Map({ topMost: true, conditions: Map({ restaurantId: key }) }));

      return result.isEmpty() ? null : result.first();
    }),
  );
});

export default packageBundleLoaderByRestaurantId;
