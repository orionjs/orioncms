Roles.registerAction('filesystem.upload', true); // input: { name, meta, uploader, uploadedBy }.
Roles.registerAction('filesystem.remove', true); // input: { url, name, meta, uploader, uploadedBy }.

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
    type: String,
  },
  name: {
    type: String,
  },
  uploader: {
    type: String,
  },
  meta: {
    type: Object,
    optional: true,
    blackbox: true,
  },
  size: {
    type: Number,
    optional: true,
  },
  uploadedBy: {
    type: String,
    optional: true,
  },
}));

orion.filesystem.collection.allow({
  insert: function(userId, doc) {
    return Roles.allow(userId, 'filesystem.upload', doc);
  },

  remove: function(userId, doc) {
    return Roles.allow(userId, 'filesystem.upload', doc);
  },
});

orion.filesystem.collection.deny({
  insert: function(userId, doc) {
    return Roles.deny(userId, 'filesystem.remove', doc);
  },

  remove: function(userId, doc) {
    return Roles.deny(userId, 'filesystem.remove', doc);
  },
});
