/**
 * Creates one object in the dictionary collection
 */
if ( orion.dictionary.collection.find().count() === 0 ) {

	orion.dictionary.collection.insert({}, function(){
		console.log("Dictionary initialized.")
	});

}