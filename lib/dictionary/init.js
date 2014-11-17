orion.dictionary = {
	collection: new Meteor.Collection('dictionary'),
	schema: {},
	categories: {},
	getDefaultCategory: function() {
		return _.first(_.keys(this.categories));
	},
	addDefinition: function(name, category, schema) {
		if (!this.categories[category]) {
			this.categories[category] = [];
		}

		this.categories[category].push(name);
		this.schema[name] = schema;

		this.collection.attachSchema(new SimpleSchema(this.schema));

	},
	get: function(name, defaultValue) {
		var dictionary = this.collection.findOne();
		name = name.split(".");
		try {
			for (var i = 0; i < name.length; i++)
		    	dictionary = dictionary[name[i]];
		} catch(error) {
			return defaultValue;
		}
		if (dictionary == this.collection.findOne()) {
			return defaultValue;
		}
		return dictionary ? dictionary : defaultValue;
	}
};