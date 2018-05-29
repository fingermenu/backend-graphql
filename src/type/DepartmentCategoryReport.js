// @flow

import { List } from 'immutable';
import { GraphQLFloat, GraphQLObjectType, GraphQLNonNull } from 'graphql';
import DepartmentCategory from './DepartmentCategory';

//export const getDepartmentCategoryReport = async (restaurantId, searchArgs, dataLoaders, sessionToken) => {
export const getDepartmentCategoryReport = async () => {
  return List();
};

const DepartmentSubCategoryReport = new GraphQLObjectType({
  name: 'DepartmentSubCategoryReport',
  fields: {
    documentCategory: {
      type: DepartmentCategory,
      resolve: async (_, args, { dataLoaders: { departmentCategoryLoaderById } }) => departmentCategoryLoaderById.load(_.get('departmentCategoryId')),
    },
    totalSale: {
      type: new GraphQLNonNull(GraphQLFloat),
      resolve: _ => _.get('totalSale'),
    },
  },
});

export default new GraphQLObjectType({
  name: 'DepartmentCategoryReport',
  fields: {
    documentCategory: {
      type: DepartmentCategory,
      resolve: async (_, args, { dataLoaders: { departmentCategoryLoaderById } }) => departmentCategoryLoaderById.load(_.get('departmentCategoryId')),
    },
    totalSale: {
      type: new GraphQLNonNull(GraphQLFloat),
      resolve: _ => _.get('totalSale'),
    },
    subcategory: {
      type: DepartmentSubCategoryReport,
      resolve: _ => _.get('departmentSubCategoryReport'),
    },
  },
});
