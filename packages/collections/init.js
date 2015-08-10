/**
 * Init the entities variable
 */
orion.collections = {};

orion.collections.hooks = {
  onCreated: [],
};

orion.collections.onCreated = function(cb) {
  this.hooks.onCreated.push(cb);
};

/**
 * Request the default templates using options
 */
Options.init('collectionsDefaultIndexTemplate');
Options.init('collectionsDefaultCreateTemplate');
Options.init('collectionsDefaultUpdateTemplate');
Options.init('collectionsDefaultDeleteTemplate');
