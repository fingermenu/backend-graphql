// @flow

import { RequestLogService } from '@fingermenu/parse-server-common';
import { Map } from 'immutable';

const logUserRequest = async ({ appVersion }, requestType, { userLoaderBySessionToken, configLoaderByKey }, sessionToken) => {
  if ('watchdog-app'.localeCompare(appVersion) === 0) {
    return;
  }

  const enableLogRequest = await configLoaderByKey.load('enableLogRequest');

  if (!enableLogRequest) {
    return;
  }

  return new RequestLogService().create(
    Map({ appVersion, requestType, userId: sessionToken ? (await userLoaderBySessionToken.load(sessionToken)).id : undefined }),
    null,
    sessionToken,
  );
};

export default logUserRequest;
