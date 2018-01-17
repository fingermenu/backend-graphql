// @flow

import { Map } from 'immutable';
import Dataloader from 'dataloader';
import { LanguageLoader } from '@fingermenu/parse-server-common';

export const languageLoaderByKey = new Dataloader(async (keys) => {
  const languageLoader = new LanguageLoader();

  return Promise.all(keys.map(async key => languageLoader.search(Map({ conditions: Map({ key }) })).first()));
});

export const languageLoaderById = new Dataloader(async (ids) => {
  const languageLoader = new LanguageLoader();

  return Promise.all(ids.map(async id => languageLoader.read(id, null)));
});
