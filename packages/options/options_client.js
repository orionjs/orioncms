/**
 * Access the options on any template
 */
Template.registerHelper('options', function(name, defaultValue) {
  return Options.get(name, defaultValue);
});