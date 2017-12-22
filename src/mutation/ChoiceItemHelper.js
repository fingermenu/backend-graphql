// @flow

import { Map } from 'immutable';
import { ParseWrapperService } from '@microbusiness/parse-server-common';
import { ChoiceItemService } from '@fingermenu/parse-server-common';

export const addChoiceItemForProvidedUser = async ({
  name, description, choiceItemPageUrl, imageUrl,
}, user, sessionToken) => {
  const acl = ParseWrapperService.createACL(user);

  return new ChoiceItemService().create(
    Map({
      ownedByUser: user,
      name,
      description,
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
