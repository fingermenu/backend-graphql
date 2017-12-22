// @flow

import { Map } from 'immutable';
import { ParseWrapperService } from '@microbusiness/parse-server-common';
import { MenuItemService } from '@fingermenu/parse-server-common';

export const addMenuItemForProvidedUser = async ({
  name, description, menuItemPageUrl, imageUrl,
}, user, sessionToken) => {
  const acl = ParseWrapperService.createACL(user);

  return new MenuItemService().create(
    Map({
      ownedByUser: user,
      name,
      description,
      menuItemPageUrl,
      imageUrl,
    }),
    acl,
    sessionToken,
  );
};

export const addMenuItem = async (info, dataLoaders, sessionToken) => {
  const user = await dataLoaders.userLoaderBySessionToken.load(sessionToken);

  return addMenuItemForProvidedUser(info, user, sessionToken);
};
