// @flow

import { ImmutableEx, RelayHelper, StringHelper } from '@microbusiness/common-javascript';
import { ChoiceItemService } from '@fingermenu/parse-server-common';
import { Map } from 'immutable';
import { connectionDefinitions } from 'graphql-relay';
import ChoiceItem from './ChoiceItem';
import Common from './Common';

const getCriteria = (searchArgs, addedByUserId, language) =>
  ImmutableEx.removeUndefinedProps(
    Map({
      language,
      ids: searchArgs.has('choiceItemIds') ? searchArgs.get('choiceItemIds') : undefined,
      conditions: Map({
        addedByUserId,
        doesNotExist_removedByUser: true,
        contains_names: StringHelper.convertStringArgumentToSet(searchArgs.get('name')),
        contains_descriptions: StringHelper.convertStringArgumentToSet(searchArgs.get('description')),
      }),
    }),
  );

const addSortOptionToCriteria = (criteria, sortOption, language) => {
  if (sortOption && sortOption.localeCompare('NameDescending') === 0) {
    return criteria.set('orderByFieldDescending', `${language}_name`);
  }

  if (sortOption && sortOption.localeCompare('NameAscending') === 0) {
    return criteria.set('orderByFieldAscending', `${language}_name`);
  }

  if (sortOption && sortOption.localeCompare('DescriptionDescending') === 0) {
    return criteria.set('orderByFieldDescending', `${language}_description`);
  }

  if (sortOption && sortOption.localeCompare('DescriptionAscending') === 0) {
    return criteria.set('orderByFieldAscending', `${language}_description`);
  }

  return criteria.set('orderByFieldAscending', `${language}_name`);
};

const getChoiceItemsCountMatchCriteria = async (searchArgs, addedByUserId, sessionToken, language) =>
  new ChoiceItemService().count(
    addSortOptionToCriteria(getCriteria(searchArgs, addedByUserId, language), searchArgs.get('sortOption'), language),
    sessionToken,
  );

const getChoiceItemsMatchCriteria = async (searchArgs, addedByUserId, sessionToken, language, limit, skip) =>
  new ChoiceItemService().search(
    addSortOptionToCriteria(getCriteria(searchArgs, addedByUserId, language), searchArgs.get('sortOption'), language).merge(Map({ limit, skip })),
    sessionToken,
  );

export const getChoiceItems = async (searchArgs, { userLoaderBySessionToken }, sessionToken, language) => {
  const userId = (await userLoaderBySessionToken.load(sessionToken)).id;
  const count = await getChoiceItemsCountMatchCriteria(searchArgs, userId, sessionToken, language);

  if (count === 0) {
    return Common.getEmptyResult();
  }

  const { limit, skip, hasNextPage, hasPreviousPage } = RelayHelper.getLimitAndSkipValue(searchArgs, count, 10, 1000);
  const results = await getChoiceItemsMatchCriteria(searchArgs, userId, sessionToken, language, limit, skip);

  return Common.convertResultsToRelayConnectionResponse(results, skip, limit, count, hasNextPage, hasPreviousPage);
};

export default connectionDefinitions({
  name: 'ChoiceItemType',
  nodeType: ChoiceItem,
});
