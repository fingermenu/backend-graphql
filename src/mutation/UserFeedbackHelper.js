// @flow

import { ParseWrapperService } from '@microbusiness/parse-server-common';
import { UserFeedbackService } from '@fingermenu/parse-server-common';
import Immutable, { Map } from 'immutable';

export const addUserFeedbackForProvidedUser = async ({ questionAndAnswers, others, restaurantId }, user, dataLoaders, sessionToken) => {
  const acl = ParseWrapperService.createACL(user);

  acl.setRoleReadAccess('administrators', true);
  acl.setRoleWriteAccess('administrators', true);

  return new UserFeedbackService().create(
    Map({
      questionAndAnswers: Immutable.fromJS(questionAndAnswers),
      others,
      submittedAt: new Date(),
      restaurantId,
      addedByUser: user,
    }),
    acl,
    sessionToken,
  );
};

export const addUserFeedback = async (info, dataLoaders, sessionToken) => {
  const user = await dataLoaders.userLoaderBySessionToken.load(sessionToken);

  return addUserFeedbackForProvidedUser(info, user, dataLoaders, sessionToken);
};
