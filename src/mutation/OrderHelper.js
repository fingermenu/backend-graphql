// @flow

import { ParseWrapperService } from '@microbusiness/parse-server-common';
import { OrderService } from '@fingermenu/parse-server-common';
import { Common } from '@microbusiness/common-javascript';
import cuid from 'cuid';
import Immutable, { Map } from 'immutable';
import { ZonedDateTime } from 'js-joda';
import updateTable from './TableHelper';

export const addOrderForProvidedUser = async (
  { correlationId, numberOfAdults, numberOfChildren, customerName, notes, restaurantId, tableId, details },
  user,
  dataLoaders,
  sessionToken,
) => {
  const acl = ParseWrapperService.createACL(user);

  acl.setRoleReadAccess('administrators', true);
  acl.setRoleWriteAccess('administrators', true);

  const calculatedCorrelationId = correlationId ? correlationId : cuid();
  const newOrderId = await new OrderService().create(
    Map({
      correlationId: calculatedCorrelationId,
      numberOfAdults,
      numberOfChildren,
      customerName,
      notes,
      placedAt: new Date(),
      restaurantId,
      tableId,
      details: Immutable.fromJS(details),
    }),
    acl,
    sessionToken,
  );

  if (!Common.isNullOrUndefined(tableId)) {
    await updateTable({ id: tableId, lastOrderCorrelationId: calculatedCorrelationId }, dataLoaders, sessionToken);
  }

  return newOrderId;
};

export const addOrder = async (info, dataLoaders, sessionToken) => {
  const user = await dataLoaders.userLoaderBySessionToken.load(sessionToken);

  return addOrderForProvidedUser(info, user, dataLoaders, sessionToken);
};

export const updateOrder = async (
  { id, numberOfAdults, numberOfChildren, customerName, notes, restaurantId, tableId, details, cancelledAt, paymentGroupId },
  sessionToken,
) => {
  if (!id) {
    throw new Error('Order Id not provided.');
  }

  let orderInfo = Map({ id })
    .merge(Common.isNullOrUndefined(numberOfAdults) ? Map() : Map({ numberOfAdults }))
    .merge(Common.isNullOrUndefined(numberOfChildren) ? Map() : Map({ numberOfChildren }))
    .merge(Common.isNullOrUndefined(customerName) ? Map() : Map({ customerName }))
    .merge(Common.isNullOrUndefined(notes) ? Map() : Map({ notes }))
    .merge(Common.isNullOrUndefined(restaurantId) ? Map() : Map({ restaurantId }))
    .merge(Common.isNullOrUndefined(tableId) ? Map() : Map({ tableId }))
    .merge(Common.isNullOrUndefined(details) ? Map() : Map({ details: Immutable.fromJS(details) }))
    .merge(Common.isNullOrUndefined(cancelledAt) ? Map() : Map({ cancelledAt }));

  const paymentGroupPaidAt = ZonedDateTime.now().toString();

  if (details && paymentGroupId) {
    orderInfo = orderInfo.update('details', details =>
      details.map(item => {
        if (paymentGroupId.localeCompare(item.getIn(['paymentGroup', 'id'])) === 0) {
          return item.setIn(['paymentGroup', 'paidAt'], paymentGroupPaidAt);
        }

        return item;
      }),
    );
  }

  await new OrderService().update(orderInfo, sessionToken);
};

export const cancelOrder = async (id, sessionToken) => {
  await updateOrder({ id, cancelledAt: new Date() }, sessionToken);
};
