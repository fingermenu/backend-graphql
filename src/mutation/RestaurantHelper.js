// @flow

import { Map } from 'immutable';
import { ParseWrapperService } from 'micro-business-parse-server-common';
import { RestaurantService } from 'finger-menu-parse-server-common';

export const addRestaurantForProvidedUser = async (
  {
    name, websiteUrl, imageUrl, address, googleMapUrl, status, inheritParentRestaurantMenus,
  },
  user,
  sessionToken,
) => {
  const acl = ParseWrapperService.createACL(user);

  return new RestaurantService().create(
    Map({
      ownedByUser: user,
      name,
      websiteUrl,
      imageUrl,
      address,
      googleMapUrl,
      status,
      inheritParentRestaurantMenus,
    }),
    acl,
    sessionToken,
  );
};

export const addRestaurant = async (info, dataLoaders, sessionToken) => {
  const user = await dataLoaders.userLoaderBySessionToken.load(sessionToken);

  return addRestaurantForProvidedUser(info, user, sessionToken);
};
