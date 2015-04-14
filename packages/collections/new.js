/**
 * Collection definition, it overrides Mongo.Collection
 */
orion.collection = function(name, options) {
  check(name, String);
  var collection = new Mongo.Collection(name, options);

  options = _.extend({
    name: name,
    routePath: name,
    pluralName: name,
    singularName: name
  }, options);

  collection = _.extend(collection, options);

  for (var i = 0, N = orion.collections.hooks.onCreated.length; i < N; i++) {
    orion.collections.hooks.onCreated[i].call(collection);
  }

  return collection;
}