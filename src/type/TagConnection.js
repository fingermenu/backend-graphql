// @flow

import { ImmutableEx, RelayHelper, StringHelper } from '@microbusiness/common-javascript';
import { TagService } from '@fingermenu/parse-server-common';
import { Map } from 'immutable';
import { connectionDefinitions } from 'graphql-relay';
import Tag from './Tag';
import Common from './Common';

const getCriteria = (searchArgs, ownedByUserId, language) =>
  ImmutableEx.removeUndefinedProps(
    Map({
      language,
      ids: searchArgs.has('tagIds') ? searchArgs.get('tagIds') : undefined,
      conditions: Map({
        ownedByUserId,
        code: searchArgs.has('code') ? searchArgs.get('code') : undefined,
        contains_names: StringHelper.convertStringArgumentToSet(searchArgs.get('name')),
        contains_descriptions: StringHelper.convertStringArgumentToSet(searchArgs.get('description')),
        forDisplay: searchArgs.has('forDisplay') ? searchArgs.get('forDisplay') : undefined,
        level: searchArgs.has('level') ? searchArgs.get('level') : undefined,
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

  if (sortOption && sortOption.localeCompare('LevelDescending') === 0) {
    return criteria.set('orderByFieldDescending', 'level');
  }

  if (sortOption && sortOption.localeCompare('LevelAscending') === 0) {
    return criteria.set('orderByFieldAscending', 'level');
  }

  if (sortOption && sortOption.localeCompare('ForDisplayDescending') === 0) {
    return criteria.set('orderByFieldDescending', 'forDisplay');
  }

  if (sortOption && sortOption.localeCompare('ForDisplayAscending') === 0) {
    return criteria.set('orderByFieldAscending', 'forDisplay');
  }

  return criteria.set('orderByFieldAscending', `${language}_name`);
};

const getTagsCountMatchCriteria = async (searchArgs, ownedByUserId, sessionToken, language) =>
  new TagService().count(
    addSortOptionToCriteria(getCriteria(searchArgs, ownedByUserId, language), searchArgs.get('sortOption'), language),
    sessionToken,
  );

const getTagsMatchCriteria = async (searchArgs, ownedByUserId, sessionToken, language, limit, skip) =>
  new TagService().search(
    addSortOptionToCriteria(getCriteria(searchArgs, ownedByUserId, language), searchArgs.get('sortOption'), language).merge(Map({ limit, skip })),
    sessionToken,
  );

export const getTags = async (searchArgs, { userLoaderBySessionToken }, sessionToken, language) => {
  const userId = (await userLoaderBySessionToken.load(sessionToken)).id;
  const count = await getTagsCountMatchCriteria(searchArgs, userId, sessionToken, language);

  if (count === 0) {
    return Common.getEmptyResult();
  }

  const { limit, skip, hasNextPage, hasPreviousPage } = RelayHelper.getLimitAndSkipValue(searchArgs, count, 10, 1000);
  const results = await getTagsMatchCriteria(searchArgs, userId, sessionToken, language, limit, skip);

  return Common.convertResultsToRelayConnectionResponse(results, skip, limit, count, hasNextPage, hasPreviousPage);
};

export default connectionDefinitions({
  name: 'TagType',
  nodeType: Tag,
});
