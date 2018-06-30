// @flow

import { List } from 'immutable';
import { GraphQLInt, GraphQLList, GraphQLFloat, GraphQLObjectType, GraphQLNonNull } from 'graphql';
import DepartmentCategory from './DepartmentCategory';

//export const getDepartmentCategoriesReport = async (searchArgs, dataLoaders, sessionToken) => {
export const getDepartmentCategoriesReport = async () => {
  return List();
};

const DepartmentSubCategoryReport = new GraphQLObjectType({
  name: 'DepartmentSubCategoryReport',
  fields: {
    departmentCategory: {
      type: GraphQLNonNull(DepartmentCategory),
      resolve: async (_, args, { dataLoaders: { departmentCategoryLoaderById } }) => departmentCategoryLoaderById.load(_.get('departmentCategoryId')),
    },
    totalSale: {
      type: new GraphQLNonNull(GraphQLFloat),
      resolve: _ => _.get('totalSale'),
    },
    quantity: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: _ => _.get('quantity'),
    },
  },
});

export default new GraphQLObjectType({
  name: 'DepartmentCategoryReport',
  fields: {
    departmentCategory: {
      type: GraphQLNonNull(DepartmentCategory),
      resolve: async (_, args, { dataLoaders: { departmentCategoryLoaderById } }) => departmentCategoryLoaderById.load(_.get('departmentCategoryId')),
    },
    totalSale: {
      type: new GraphQLNonNull(GraphQLFloat),
      resolve: _ => _.get('totalSale'),
    },
    quantity: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: _ => _.get('quantity'),
    },
    departmentSubCategoriesReport: {
      type: new GraphQLList(new GraphQLNonNull(DepartmentSubCategoryReport)),
      resolve: _ => _.get('departmentSubCategoriesReport'),
    },
  },
});
