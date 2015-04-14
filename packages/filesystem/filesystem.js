orion.filesystem = {};

/**
 * Files stored in the database
 */
orion.filesystem.collection = new Mongo.Collection('orionFiles');

/**
 * Files collection schema
 */
orion.filesystem.collection.attachSchema(new SimpleSchema({
  url: {
    type: String
  },
  name: {
    type: String
  },
  uploader: {
    type: String
  },
  meta: {
    type: Object,
    optional: true,
    blackbox: true
  }
}));

/**
 * TODO: fix permissions here
 */
orion.filesystem.collection.allow({
  insert: function (userId, doc) {
    return true;
  },
  update: function (userId, doc, fields, modifier) {
    return true;
  },
  remove: function (userId, doc) {
    return true;
  }
});