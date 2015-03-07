orion.dictionary.get = function(name, defaultValue) {
	if (!defaultValue || defaultValue instanceof Spacebars.kw) {
		defaultValue = '';
	}

	var dictionary = this.collection.findOne();
	name = name.split(".");

	try {
		for (var i = 0; i < name.length; i++) {
			if (name[i] in dictionary) {
				dictionary = dictionary[name[i]];
			} else {
				return defaultValue;
			}
		}
	} catch(error) {
		return defaultValue;
	}

	return dictionary ? dictionary : defaultValue;
};