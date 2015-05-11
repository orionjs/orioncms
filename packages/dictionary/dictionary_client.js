/**
 * Access the dictionary on any template
 */
Template.registerHelper('dict', function(name, defaultValue) {
  return orion.dictionary.get(name, defaultValue);
});

/**
 * Is the dictionary active
 */
Template.registerHelper('dictionaryReady', function() {
  return !!orion.dictionary.findOne();
});

orion.dictionary.availableCategories = function() {
  return _.union.apply(this, Roles.helper(Meteor.userId(), 'dictionary.allowedCategories'));
};
