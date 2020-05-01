const DEFAULT_LANGUAGE = "en";

const localeManager = (language) => {
    const lowerCaseLanguage = language ? language.toLowerCase() : DEFAULT_LANGUAGE;
    const locale = require('./resources/' + lowerCaseLanguage + ".json");
    return (locale) ? locale : localeManager(DEFAULT_LANGUAGE);
};

module.exports = localeManager;