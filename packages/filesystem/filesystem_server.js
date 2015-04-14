Meteor.publish('filesystem_file_toEarse', function(fileId) {
  check(fileId, String);
  return orion.filesystem.collection.find(fileId);
})