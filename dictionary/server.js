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
Meteor.publish('dictionary', function(options) {
	options = options ? options : {};
	return orion.dictionary.collection.find(options);
});