// @flow

import { Map } from 'immutable';
import Dataloader from 'dataloader';
import { LanguageService } from '@fingermenu/parse-server-common';

export const languageLoaderByKey = new Dataloader(async (keys) => {
  const languageService = new LanguageService();

  return Promise.all(keys.map(async key => languageService.search(Map({ conditions: Map({ key }) })).first()));
});

export const languageLoaderById = new Dataloader(async (ids) => {
  const languageService = new LanguageService();

  return Promise.all(ids.map(async id => languageService.read(id, null)));
});
