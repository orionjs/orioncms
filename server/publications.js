Meteor.publish('dictionary', function(options) {
	Meteor._sleepForMs(2000);
	options = options ? options : {};
	return cms.dictionary.collection.find(options);
});

Meteor.publish('entity', function(name, options) {
	Meteor._sleepForMs(2000);
	options = options ? options : {};
	return cms.entities[name].collection.find(options);
});