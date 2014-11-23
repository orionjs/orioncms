orion.dictionary.get = function(name, defaultValue) {
	var dictionary = this.collection.findOne();
	name = name.split(".");

	try {
		for (var i = 0; i < name.length; i++)
	    	dictionary = dictionary[name[i]];
	} catch(error) {
		return defaultValue;
	}

	if (typeof(dictionary) === 'undefined') {
		return defaultValue;
	}
	
	return dictionary ? dictionary : defaultValue;
};