// @flow

import { Common } from '@microbusiness/common-javascript';
import cuid from 'cuid';
import Immutable, { Map } from 'immutable';
import { ParseWrapperService } from '@microbusiness/parse-server-common';
import { OrderService } from '@fingermenu/parse-server-common';
import updateTable from './TableHelper';

export const addOrderForProvidedUser = async (
  { corelationId, numberOfAdults, numberOfChildren, customerName, notes, totalPrice, restaurantId, tableId, details },
  user,
  dataLoaders,
  sessionToken,
) => {
  const acl = ParseWrapperService.createACL(user);

  acl.setRoleReadAccess('administrators', true);
  acl.setRoleWriteAccess('administrators', true);

  const calculatedCorelationId = corelationId ? corelationId : cuid();
  const newOrderId = await new OrderService().create(
    Map({
      corelationId: calculatedCorelationId,
      numberOfAdults,
      numberOfChildren,
      customerName,
      notes,
      totalPrice,
      placedAt: new Date(),
      restaurantId,
      tableId,
      details: Immutable.fromJS(details),
    }),
    acl,
    sessionToken,
  );

  if (!Common.isNullOrUndefined(tableId)) {
    await updateTable({ id: tableId, lastOrderCorelationId: calculatedCorelationId }, dataLoaders, sessionToken);
  }

  return newOrderId;
};

export const addOrder = async (info, dataLoaders, sessionToken) => {
  const user = await dataLoaders.userLoaderBySessionToken.load(sessionToken);

  return addOrderForProvidedUser(info, user, dataLoaders, sessionToken);
};

export const updateOrder = async (
  { id, numberOfAdults, numberOfChildren, customerName, notes, totalPrice, restaurantId, tableId, details, cancelledAt },
  sessionToken,
) => {
  if (!id) {
    throw new Error('Order Id not provided.');
  }

  const orderInfo = Map({ id })
    .merge(Common.isNullOrUndefined(numberOfAdults) ? Map() : Map({ numberOfAdults }))
    .merge(Common.isNullOrUndefined(numberOfChildren) ? Map() : Map({ numberOfChildren }))
    .merge(Common.isNullOrUndefined(customerName) ? Map() : Map({ customerName }))
    .merge(Common.isNullOrUndefined(notes) ? Map() : Map({ notes }))
    .merge(Common.isNullOrUndefined(totalPrice) ? Map() : Map({ totalPrice }))
    .merge(Common.isNullOrUndefined(restaurantId) ? Map() : Map({ restaurantId }))
    .merge(Common.isNullOrUndefined(tableId) ? Map() : Map({ tableId }))
    .merge(Common.isNullOrUndefined(details) ? Map() : Map({ details: Immutable.fromJS(details) }))
    .merge(Common.isNullOrUndefined(cancelledAt) ? Map() : Map({ cancelledAt }));

  await new OrderService().update(orderInfo, sessionToken);
};

export const cancelOrder = async (id, sessionToken) => {
  await updateOrder({ id, cancelledAt: new Date() }, sessionToken);
};
