// @flow

import { RequestLogService } from '@fingermenu/parse-server-common';
import { Map } from 'immutable';

const logUserRequest = async ({ appVersion }, requestType, { userLoaderBySessionToken }, sessionToken) =>
  new RequestLogService().create(
    Map({ appVersion, requestType, userId: sessionToken ? (await userLoaderBySessionToken.load(sessionToken)).id : undefined }),
    null,
    sessionToken,
  );

export default logUserRequest;
