Template.registerHelper('pages', function(kw) {
	var options = (kw && kw.hash) || {};
	return orion.pages.collection.find(options);
});