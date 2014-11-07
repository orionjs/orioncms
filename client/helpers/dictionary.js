Template.registerHelper('getDict', function() {
  return cms.dictionary.collection.findOne();
});


Template.registerHelper('dict', function(name, defaultValue) {
	var dictionary = cms.dictionary.collection.findOne();

	name = name.split(".");
    
    try {
    	for (var i = 0; i < name.length; i++)
        	dictionary = dictionary[name[i]];
	} catch(error) {
		return defaultValue;
	}

    return dictionary ? dictionary : defaultValue;
});
