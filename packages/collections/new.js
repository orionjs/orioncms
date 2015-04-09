/**
 * Collection definition, it overrides Mongo.Collection
 */
orion.collection = function(name, options) {
  var collection = new Mongo.Collection(name, options);

  options = _.extend({
    
  }, options);

  collection = _.extend(options, collection);

  for (var i = 0, N = orion.collections.hooks.onCreated.length; i < N; i++) {
    orion.collections.hooks.onCreated[i].call(collection);
  }

  return collection;
}