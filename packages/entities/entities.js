/**
 * Set the default options for orion entities
 * The only reason to set this to null is to show to the developer that they can override them
 */
orion.setOptions({
  defaultEntitiesIndexTemplate: null,
  defaultEntitiesCreateTemplate: null,
  defaultEntitiesUpdateTemplate: null,
  defaultEntitiesDeleteTemplate: null,
})

/**
 * Entities definition, it overrides Mongo.Collection
 */
orion.entity = function(name, options) {
  var collection = new Mongo.Collection(name, options);

  options = _.extend({
    indexTemplate: orion.options.defaultEntitiesIndexTemplate,
    createTemplate: orion.options.defaultEntitiesCreateTemplate,
    updateTemplate: orion.options.defaultEntitiesUpdateTemplate,
    deleteTemplate: orion.options.defaultEntitiesDeleteTemplate,
    routePrefix: name,
  }, options);

  collection = _.extend(options, collection);

  return collection;
}