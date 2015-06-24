/**
 * Definition of the config object
 */
orion.config = {
  collection: new Meteor.Collection('orion_config'),
  object: {}
};

/**
 * Allows to set some fields on simple schema
 */
SimpleSchema.extendOptions({
  category: Match.Optional(String),
  public: Match.Optional(Boolean),
  secret: Match.Optional(Boolean),
  name: Match.Optional(String)
});

/**
 * To get reactively if the config is active
 */
orion.config._isActiveDependency = new Tracker.Dependency();
orion.config._isActive = false;
orion.config.isActive = function() {
  this._isActiveDependency.depend();
  return this._isActive;
};

/**
 * Register the action for the permissions
 */
Roles.registerAction('config.update', true);

/**
 * Permissions for the dictionary.
 */
orion.config.collection.allow({
  /**
   * No one can insert a config object
   * becouse it only uses one and its created
   * automatically.
   */
  'insert': function(userId, doc) {
    return false;
  },
  /**
   * No one can remove a config object
   * becouse it only uses one.
   */
  'remove': function(userId, doc) {
    return false;
  }
});

orion.config.collection.allow({
  'update': function(userId, doc, fields, modifier) {
    return Roles.allow(userId, 'config.update', userId, doc, fields, modifier);
  }
});

orion.config.collection.deny({
  'update': function(userId, doc, fields, modifier) {
    return Roles.deny(userId, 'config.update', userId, doc, fields, modifier);
  }
});

/**
 * Function to add a config.
 * This just modifies the schema of the config object
 * and adds the form in the admin panel.
 */
orion.config.add = function(name, category, options) {
  var newSchema = (this.collection.simpleSchema() && _.clone(this.collection.simpleSchema()._schema)) || {};

  newSchema[name] = _.extend({
    type: String,
    secret: false,
    label: name,
    public: false,
    category: category,
    name: name
  }, options || {});

  if (newSchema[name].secret) {
    newSchema[name].autoform = {
      type: 'password',
      'data-type': 'secret',
    };
  }

  this.collection.attachSchema(new SimpleSchema(newSchema));

  if (!this._isActive) {
    this._isActive = true;
    this._isActiveDependency.changed();
  }
};

/**
 * Returns the value of the config.
 * If the config doesn't exists it
 * returns the defaultValue
 */
orion.config.get = function(path, defaultValue) {
  // Sets empty string to avoid problems on templates
  defaultValue = !defaultValue || defaultValue instanceof Spacebars.kw ? '' : defaultValue;
  return orion.helpers.searchObjectWithDots(this.object, path) || defaultValue;
};

/**
 * Returns the public options
 */
orion.config.getPublicFields = function() {
  var atts = this.collection.simpleSchema() && _.where(this.collection.simpleSchema()._schema, { public: true });
  return atts && _.pluck(atts, 'name');
};

/**
 * Returns fields that are not public
 */
orion.config.getPrivateFields = function() {
  var atts = this.collection.simpleSchema() && _.where(this.collection.simpleSchema()._schema, { public: false });
  return atts && _.pluck(atts, 'name');
};