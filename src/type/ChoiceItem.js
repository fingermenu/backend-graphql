// @flow

import { GraphQLID, GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import { ChoiceItemService } from '@fingermenu/parse-server-common';
import { NodeInterface } from '../interface';

export const getChoiceItem = async (choiceItemId, sessionToken) => new ChoiceItemService().read(choiceItemId, null, sessionToken);

export default new GraphQLObjectType({
  name: 'ChoiceItem',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: _ => _.get('id'),
    },
    name: {
      type: GraphQLString,
      resolve: (_, args, { language }) => {
        const allValues = _.get('name');

        return allValues ? allValues.get(`${language}_name`) : null;
      },
    },
    description: {
      type: GraphQLString,
      resolve: (_, args, { language }) => {
        const allValues = _.get('description');

        return allValues ? allValues.get(`${language}_description`) : null;
      },
    },
    menuItemPageUrl: {
      type: GraphQLString,
      resolve: async _ => _.get('menuItemPageUrl'),
    },
    imageUrl: {
      type: GraphQLString,
      resolve: async _ => _.get('imageUrl'),
    },
  },
  interfaces: [NodeInterface],
});
