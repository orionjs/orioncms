/**
 * Creates one object in the dictionary collection
 * The dictionary is one object saved in the database
 */
if (orion.dictionary.collection.find().count() === 0) {

	orion.dictionary.collection.insert({}, function(){
		console.log("Dictionary initialized.")
	});

}

/**
 * Publications of the dictionary
 */
Meteor.publish(null, function() {
	return orion.dictionary.collection.find();
});

/**
 * Deprecation notice
 */
Meteor.publish('dictionary', function(options) {
	console.log('Do not subscribe to the dictionary, the client is subscribed automatically. This publication will be removed and will cause errors on your app.')
	return [];
});