Template.registerHelper('getDict', function() {
  return cms.dictionary.collection.findOne();
});


Template.registerHelper('dict', function(name, defaultValue) {
	return cms.dictionary.get(name, defaultValue);
});
