// @flow

import { Common } from '@microbusiness/common-javascript';
import Immutable, { Map } from 'immutable';
import { ParseWrapperService } from '@microbusiness/parse-server-common';
import { OrderService } from '@fingermenu/parse-server-common';
import { getOrder } from '../type';

export const addOrderForProvidedUser = async ({
  customerName, notes, totalPrice, tableId, details,
}, user, sessionToken) => {
  const acl = ParseWrapperService.createACL(user);

  return new OrderService().create(
    Map({
      customerName,
      notes,
      totalPrice,
      placedAt: new Date(),
      tableId,
      details: Immutable.fromJS(details),
    }),
    acl,
    sessionToken,
  );
};

export const addOrder = async (info, dataLoaders, sessionToken) => {
  const user = await dataLoaders.userLoaderBySessionToken.load(sessionToken);

  return addOrderForProvidedUser(info, user, sessionToken);
};

export const updateOrder = async ({
  id, customerName, notes, totalPrice, tableId, details, tableState,
}, dataLoaders, sessionToken) => {
  if (!id) {
    throw new Error('Order Id not provided.');
  }

  const orderInfo = (await getOrder(id, sessionToken))
    .merge(Common.isNullOrUndefined(customerName) ? Map() : Map({ customerName }))
    .merge(Common.isNullOrUndefined(notes) ? Map() : Map({ notes }))
    .merge(Common.isNullOrUndefined(totalPrice) ? Map() : Map({ totalPrice }))
    .merge(Common.isNullOrUndefined(tableId) ? Map() : Map({ tableId }))
    .merge(Common.isNullOrUndefined(details) ? Map() : Map({ details: Immutable.fromJS(details) }))
    .merge(Common.isNullOrUndefined(tableState) ? Map() : Map({ tableStateId: (await dataLoaders.tableStateLoaderByKey.load(tableState)).get('id') }));

  await new OrderService().update(orderInfo, sessionToken);

  return orderInfo;
};

export const cancelOrder = async (id, dataLoaders, sessionToken) => updateOrder({ id }, dataLoaders, sessionToken);
