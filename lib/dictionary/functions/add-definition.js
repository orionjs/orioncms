orion.dictionary.addDefinition = function(name, category, schema) {
	if (!this.categories[category]) {
		this.categories[category] = [];
	}

	this.categories[category].push(name);
	this.schema[name] = _.extend({
		optional: true
	}, schema);

	this.collection.attachSchema(new SimpleSchema(this.schema));

};