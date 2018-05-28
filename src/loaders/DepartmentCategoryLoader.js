// @flow

import { DepartmentCategoryService } from '@fingermenu/parse-server-common';
import { List, Map } from 'immutable';
import Dataloader from 'dataloader';

const departmentCategoryLoaderById = new Dataloader(async ids => {
  const departmentCategorys = await new DepartmentCategoryService().search(Map({ ids: List(ids), limit: 1000, skip: 0 }));

  return ids.map(id => departmentCategorys.find(departmentCategory => departmentCategory.get('id').localeCompare(id) === 0));
});

export default departmentCategoryLoaderById;
