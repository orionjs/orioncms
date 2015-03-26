/**
 * Creates the languages variable
 */
orion.languages = {
	defaultLanguage: null,
	aditionalLanguages: [],
	autoDetect: true,
};



/**
 * Returns if the languages are active
 */
orion.languages.isActive = function() {
	return this.defaultLanguage && this.aditionalLanguages.length;
}

/**
 * Sets the defualt language. Needed to initialize the language pack
 */
orion.languages.setDefaultLanguage = function(options) {

	check(options, {
		name: String
	});

	orion.languages.defaultLanguage = options;
}

/**
 * Adds a new language
 */
orion.languages.addLanguage = function(options) {

	check(options, {
		identifier: String,
		name: String
	});

	orion.languages.aditionalLanguages.push(options);
}