/**
 * Fetch the config at the start of the program
 */
orion.config.object = Injected.obj('orion.config');

orion.config.getCategories = function() {
  return _.uniq(_.pluck(orion.config.collection.simpleSchema()._schema, 'category'));
};
