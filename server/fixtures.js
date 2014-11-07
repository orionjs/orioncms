if ( cms.dictionary.collection.find().count() === 0 ) {

	    cms.dictionary.collection.insert({}, function(){
	    	console.log("Dictionary initialized.")
	    });
	    
	}