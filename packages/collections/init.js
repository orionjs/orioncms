/**
 * Init the entities variable
 */
orion.collections = {};

orion.collections.hooks = {
  onCreated: [],
};

orion.collections.onCreated = function(cb) {
  this.hooks.onCreated.push(cb);
}

/**
 * Request the default templates using options
 */
orion.options.init('collectionsDefaultIndexTemplate');
orion.options.init('collectionsDefaultCreateTemplate');
orion.options.init('collectionsDefaultUpdateTemplate');
orion.options.init('collectionsDefaultDeleteTemplate');