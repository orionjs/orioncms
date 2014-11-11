cms.dictionary = {
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
		if (typeof(dictionary) == 'object') {
			return defaultValue;
		}
		return dictionary ? dictionary : defaultValue;
	}
};

cms.dictionary.collection.allow({
	'insert': function(userId, doc) {
		return userId;
	},
	'update': function(userId, doc, fields, modifier) {
		return userId;
	},
	'remove': function(userId, doc) {
		return userId;
	}
});