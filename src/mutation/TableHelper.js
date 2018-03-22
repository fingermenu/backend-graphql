// @flow

import { Common } from '@microbusiness/common-javascript';
import Immutable, { Map } from 'immutable';
import { TableService } from '@fingermenu/parse-server-common';

const updateTable = async (
  { id, name, status, tableState, numberOfAdults, numberOfChildren, customerName, notes, lastOrderCorrelationId },
  dataLoaders,
  sessionToken,
) => {
  if (!id) {
    throw new Error('Table Id not provided.');
  }

  const tableInfo = Map({ id })
    .merge(
      Common.isNullOrUndefined(name)
        ? Map()
        : Map({
          name: Immutable.fromJS(name).reduce((reduction, languageValue) => reduction.set(languageValue.language, languageValue.value), Map()),
        }),
    )
    .merge(Common.isNullOrUndefined(status) ? Map() : Map({ status }))
    .merge(Common.isNullOrUndefined(tableState) ? Map() : Map({ tableStateId: (await dataLoaders.tableStateLoaderByKey.load(tableState)).get('id') }))
    .merge(Common.isNullOrUndefined(numberOfAdults) ? Map() : Map({ numberOfAdults }))
    .merge(Common.isNullOrUndefined(numberOfChildren) ? Map() : Map({ numberOfChildren }))
    .merge(Common.isNullOrUndefined(customerName) ? Map() : Map({ customerName }))
    .merge(Common.isNullOrUndefined(notes) ? Map() : Map({ notes }))
    .merge(Common.isNullOrUndefined(lastOrderCorrelationId) ? Map() : Map({ lastOrderCorrelationId }));

  await new TableService().update(tableInfo, sessionToken);
};

export default updateTable;
