// @flow

import { ParseWrapperService } from '@microbusiness/parse-server-common';
import { RestaurantService } from '@fingermenu/parse-server-common';
import Immutable, { Map } from 'immutable';

export const addRestaurantForProvidedUser = async (
  { name, websiteUrl, imageUrl, address, googleMapUrl, status, inheritParentRestaurantMenus, pin },
  user,
  sessionToken,
) => {
  const acl = ParseWrapperService.createACL(user);

  acl.setRoleReadAccess('administrators', true);
  acl.setRoleWriteAccess('administrators', true);

  return new RestaurantService().create(
    Map({
      ownedByUser: user,
      name: Immutable.fromJS(name).reduce((reduction, languageValue) => reduction.set(languageValue.language, languageValue.value), Map()),
      websiteUrl,
      imageUrl,
      address,
      googleMapUrl,
      status,
      inheritParentRestaurantMenus,
      pin,
    }),
    acl,
    sessionToken,
  );
};

export const addRestaurant = async (info, dataLoaders, sessionToken) => {
  const user = await dataLoaders.userLoaderBySessionToken.load(sessionToken);

  return addRestaurantForProvidedUser(info, user, sessionToken);
};
