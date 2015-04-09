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
    singularName: name,
    link: {
      title: name[0].toUpperCase() + name.slice(1),
      section: 'medium'
    }
  }, options);

  collection = _.extend(collection, options);

  for (var i = 0, N = orion.collections.hooks.onCreated.length; i < N; i++) {
    orion.collections.hooks.onCreated[i].call(collection);
  }

  return collection;
}