Meteor.methods({
  getFileDataToEarse: function (fileId) {
    check(fileId, String);
    return orion.filesystem.collection.findOne(fileId);
  }
});