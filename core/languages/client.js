/**
 * Return the languages variable to the client
 */
Template.registerHelper('languages', function() {
	return orion.languages;
});

/**
 * Detects and set the language
 */
orion.languages.detectLanguage = function() {
	var language = window.navigator.userLanguage || window.navigator.language;
	language = language.split('-')[0];
	orion.languages.setCurrentLanguage(language);
}

/**
 * Detects and set the language on startup
 */
Meteor.startup(function () {
	if (orion.languages.autoDetect) {
		orion.languages.detectLanguage();
	}
});

/**
 * Sets the current language, do not specify identifier to default
 */
orion.languages.setCurrentLanguage = function(identifier) {
	var language = _.findWhere(orion.languages.aditionalLanguages, { identifier: identifier });
	if (language) {
		Session.set('currentLanguage', identifier);
	} else {
		Session.set('currentLanguage', undefined);
	}
}

/**
 * Returns the current language, undefined if current is default
 */
orion.languages.getCurrentLanguage = function() {
	var identifier = Session.get('currentLanguage');
	return identifier && _.findWhere(orion.languages.aditionalLanguages, { identifier: identifier });
}

/**
 * Returns if the current language is the default
 */
orion.languages.isCurrentDefault = function() {
	return Session.equals('currentLanguage', undefined);
}

/**
 * Returns if the current language is the specified
 */
orion.languages.isCurrent = function(identifier) {
	return Session.equals('currentLanguage', identifier);
}