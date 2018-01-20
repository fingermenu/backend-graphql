// @flow

import { Common } from '@microbusiness/common-javascript';
import Immutable, { Map } from 'immutable';
import { TableService } from '@fingermenu/parse-server-common';
import { getTable } from '../type';

const updateTable = async ({
  id, name, status, tableState, numberOfAdults, numberOfChildren, customerName, notes,
}, dataLoaders, sessionToken) => {
  if (!id) {
    throw new Error('Table Id not provided.');
  }

  const tableInfo = await getTable(id)
    .merge(Common.isNullOrUndefined(name)
      ? Map()
      : Immutable.fromJS(name).reduce((reduction, languageValue) => reduction.set(languageValue.language, languageValue.value), Map()))
    .merge(Common.isNullOrUndefined(status) ? Map() : Map({ status }))
    .merge(Common.isNullOrUndefined(tableState) ? Map() : Map({ tableState: await dataLoaders.tableStateLoaderByKey.load(tableState) }))
    .merge(Common.isNullOrUndefined(numberOfAdults) ? Map() : Map({ numberOfAdults }))
    .merge(Common.isNullOrUndefined(numberOfChildren) ? Map() : Map({ numberOfChildren }))
    .merge(Common.isNullOrUndefined(customerName) ? Map() : Map({ customerName }))
    .merge(Common.isNullOrUndefined(notes) ? Map() : Map({ notes }));

  await new TableService().update(tableInfo, sessionToken);

  return tableInfo;
};

export default updateTable;
