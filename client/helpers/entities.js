Template.registerHelper('getEntities', function() {
	result = [];
	_.each(cms.entities, function(value, key) {
		result.push(value);
	});
	return result;
});