// @flow

import { Common } from '@microbusiness/common-javascript';
import { TableService } from '@fingermenu/parse-server-common';
import Immutable, { Map } from 'immutable';

const updateTable = async ({ id, name, status, tableState, customers, notes, lastOrderCorrelationId }, dataLoaders, sessionToken) => {
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
    .merge(Common.isNullOrUndefined(customers) ? Map() : Map({ details: Immutable.fromJS(customers) }))
    .merge(Common.isNullOrUndefined(notes) ? Map() : Map({ notes }))
    .merge(Common.isNullOrUndefined(lastOrderCorrelationId) ? Map() : Map({ lastOrderCorrelationId }));

  await new TableService().update(tableInfo, sessionToken);
};

export default updateTable;
