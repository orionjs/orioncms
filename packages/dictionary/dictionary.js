/**
 * Creates the dictionary mongo collection
 */ 
orion.dictionary = new Mongo.Collection('dictionary');

/**
 * Dictionary permissions
 */
orion.dictionary.allow({
  /**
   * No one can insert a dicionary object
   * becouse it only uses one and its created
   * automatically
   */
  'insert': function(userId, doc) {
    return false;
  },
  /**
   * No one can remove a dicionary object
   * becouse it only uses one.
   */
  'remove': function(userId, doc) {
    return false;
  },
  /**
   * This is momentary
   */
  'update': function() {
    return true;
  }
});

/**
 * Function to add a definition to the dictionary.
 * This just modifies the schema of the dictionary object
 * and adds the form in the admin.
 */
orion.dictionary.addDefinition = function(name, category, attribute) {
  var newSchema = (this.simpleSchema() && _.clone(this.simpleSchema()._schema)) || {};

  newSchema[category] = newSchema[category] || {
    type: Object,
    optional: true
  };

  newSchema[category + '.' + name] = _.extend({
    optional: true
  }, attribute);

  this.attachSchema(new SimpleSchema(newSchema));
};

/**
 * Returns the value of the definition.
 * If the definition doesn't exists it 
 * returns the defaultValue
 */
orion.dictionary.get = function(path, defaultValue) {
  // Sets empty string to avoid problems on templates
  defaultValue = !defaultValue || defaultValue instanceof Spacebars.kw ? '' : defaultValue;
  return orion.helpers.searchObjectWithDots(this.findOne(), path) || defaultValue;
};