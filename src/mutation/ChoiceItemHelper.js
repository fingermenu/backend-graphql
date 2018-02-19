// @flow

import Immutable, { Map } from 'immutable';
import { ParseWrapperService } from '@microbusiness/parse-server-common';
import { ChoiceItemService } from '@fingermenu/parse-server-common';

export const addChoiceItemForProvidedUser = async ({ name, description, choiceItemPageUrl, imageUrl }, user, sessionToken) => {
  const acl = ParseWrapperService.createACL(user);

  acl.setRoleReadAccess('administrators', true);
  acl.setRoleWriteAccess('administrators', true);

  return new ChoiceItemService().create(
    Map({
      ownedByUser: user,
      name: Immutable.fromJS(name).reduce((reduction, languageValue) => reduction.set(languageValue.language, languageValue.value), Map()),
      description: Immutable.fromJS(description).reduce(
        (reduction, languageValue) => reduction.set(languageValue.language, languageValue.value),
        Map(),
      ),
      choiceItemPageUrl,
      imageUrl,
    }),
    acl,
    sessionToken,
  );
};

export const addChoiceItem = async (info, dataLoaders, sessionToken) => {
  const user = await dataLoaders.userLoaderBySessionToken.load(sessionToken);

  return addChoiceItemForProvidedUser(info, user, sessionToken);
};
