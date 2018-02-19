// @flow

import Immutable, { Map } from 'immutable';
import { ParseWrapperService } from '@microbusiness/parse-server-common';
import { MenuItemService } from '@fingermenu/parse-server-common';

export const addMenuItemForProvidedUser = async ({ name, description, menuItemPageUrl, imageUrl }, user, sessionToken) => {
  const acl = ParseWrapperService.createACL(user);

  acl.setRoleReadAccess('administrators', true);
  acl.setRoleWriteAccess('administrators', true);

  return new MenuItemService().create(
    Map({
      ownedByUser: user,
      name: Immutable.fromJS(name).reduce((reduction, languageValue) => reduction.set(languageValue.language, languageValue.value), Map()),
      description: Immutable.fromJS(description).reduce(
        (reduction, languageValue) => reduction.set(languageValue.language, languageValue.value),
        Map(),
      ),
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
