// @flow

export default class Common {
  static getTranslation = async (info, columnName, language, configLoader) => {
    const allValues = info.get(columnName);

    if (!allValues) {
      return null;
    }

    if (allValues.has(language)) {
      return allValues.get(language);
    }

    return allValues.get(await configLoader.load('fallbackLanguage'));
  };
}
