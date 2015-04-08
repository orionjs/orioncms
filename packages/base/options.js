/**
 * Default values for orion
 */
orion.options = {}


orion.setOptions = function(options) {
  orion.options = _.extend(options, orion.options);
}

orion.setOptions({
  appName: 'name'
})