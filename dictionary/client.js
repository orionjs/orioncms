/**
 * Access the dictionary on any template
 */
Template.registerHelper('dict', function(name, defaultValue) {
	return orion.dictionary.get(name, defaultValue);
});

/**
 * Subscribe to the dictionary when the app starts
 */
Meteor.startup(function () {
	orion.subs.subscribe('dictionary');
});