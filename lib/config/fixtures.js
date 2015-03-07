/**
 * Creates one object in the config collection
 */
if ( orion.config.collection.find().count() === 0 ) {

	orion.config.collection.insert({}, function(){
		console.log("Orion config initialized.")
	});

}