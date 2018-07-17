// @flow

import { createConfigLoaderByKey } from '@microbusiness/parse-server-common';
import { TagService } from '@fingermenu/parse-server-common';
import { List, Map } from 'immutable';
import Dataloader from 'dataloader';
import cuid from 'cuid';

export const otherTagId = cuid();

const tagLoaderById = new Dataloader(async ids => {
  const tags = await new TagService().search(Map({ ids: List(ids), limit: 1000, skip: 0 }));
  const fallbackLanguage = await createConfigLoaderByKey().load('fallbackLanguage');

  return ids.map(id => {
    if (id.localeCompare(otherTagId) === 0) {
      return Map({ id: otherTagId, key: '', name: Map(), desription: Map(), level: 1 })
        .setIn(['name', fallbackLanguage], 'Other')
        .setIn(['desription', fallbackLanguage], 'Other');
    }

    return tags.find(tag => tag.get('id').localeCompare(id) === 0);
  });
});

export default tagLoaderById;
