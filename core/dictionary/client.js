/**
 * Access the dictionary on any template
 */
Template.registerHelper('dict', function(name, defaultValue) {
	return orion.dictionary.get(name, defaultValue);
});

/**
 * Is the dictionary active
 */
Template.registerHelper('isDictionaryActive', function() {
	return orion.dictionary.isActive();
});