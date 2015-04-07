Meteor.publish('admin-files', function(options) {
	options = options ? options : {};
	return orion.filesystem.files.collection.find(options);
});