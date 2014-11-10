Meteor.publish('dictionary', function(options) {
	options = options ? options : {};
	return cms.dictionary.collection.find(options);
});

Meteor.publish('entity', function(name, options) {
	options = options ? options : {};
	return cms.entities[name].collection.find(options);
});