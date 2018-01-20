// @flow

import Immutable, { Map } from 'immutable';
import { TableService } from '@fingermenu/parse-server-common';
import { getTable } from '../type';

const isNullOrUndefined = value => typeof value === 'undefined' || value === null;

const updateTable = async ({
  id, name, status, tableState, numberOfAdults, numberOfChildren, customerName, notes,
}, dataLoaders, sessionToken) => {
  if (!id) {
    throw new Error('Table Id not provided.');
  }

  const tableInfo = await getTable(id)
    .merge(isNullOrUndefined(name)
      ? Map()
      : Immutable.fromJS(name).reduce((reduction, languageValue) => reduction.set(languageValue.language, languageValue.value), Map()))
    .merge(isNullOrUndefined(status) ? Map() : Map({ status }))
    .merge(isNullOrUndefined(tableState) ? Map() : Map({ tableState: await dataLoaders.tableStateLoaderByKey.load(tableState) }))
    .merge(isNullOrUndefined(numberOfAdults) ? Map() : Map({ numberOfAdults }))
    .merge(isNullOrUndefined(numberOfChildren) ? Map() : Map({ numberOfChildren }))
    .merge(isNullOrUndefined(customerName) ? Map() : Map({ customerName }))
    .merge(isNullOrUndefined(notes) ? Map() : Map({ notes }));

  await new TableService().update(tableInfo, sessionToken);

  return tableInfo;
};

export default updateTable;
