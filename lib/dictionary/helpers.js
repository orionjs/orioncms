Template.registerHelper('dict', function(name, defaultValue) {
	return orion.dictionary.get(name, defaultValue);
});