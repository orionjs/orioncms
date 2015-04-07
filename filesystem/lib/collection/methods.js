orion.filesystem.files.register = function(file) {
	var id = orion.filesystem.files.collection.insert(file);
	return orion.filesystem.files.collection.findOne(id);
}

orion.filesystem.files.get = function(selector) {
	return orion.filesystem.files.collection.findOne(selector);
}

orion.filesystem.files.remove = function(selector) {
	return orion.filesystem.files.collection.remove(selector);
}