/**
 * Definition of the dictionary object
 */
orion.dictionary = {
	collection: new Meteor.Collection('dictionary'),
	schema: {},
	categories: {},
};

/**
 * Permissions for the dictionary.
 */
orion.dictionary.collection.allow({
	/**
	 * No one can insert a dicionary object
	 * becouse it only uses one and its created
	 * automatically
	 */
	'insert': function(userId, doc) {
		return false;
	},
	/**
	 * Check if user has permission for that 
	 * dictionary category.
	 */
	'update': function(userId, doc, fields, modifier) {
		var user = Meteor.users.findOne(userId);
		var canEdit = !!userId;
		fields.map(function(field) {
			var category = orion.dictionary.getCategoryOf(field);
			if (!user.hasPermission('dictionary.' + category)) {
				canEdit = false;
			}
		});
		return canEdit;
	},
	/**
	 * No one can remove a dicionary object
	 * becouse it only uses one.
	 */
	'remove': function(userId, doc) {
		return false;
	}
});

/**
 * Function to add a definition to the dictionary.
 * This just modifies the schema of the dictionary object
 * and adds the form in the admin.
 */
orion.dictionary.addDefinition = function(name, category, schema) {
	if (!this.categories[category]) {
		this.categories[category] = [];
		orion.users.permissions.add('dictionary.' + category);
	}

	this.categories[category].push(name);
	this.schema[name] = _.extend({
		optional: true
	}, schema);

	this.collection.attachSchema(new SimpleSchema(this.schema));
};

/**
 * Returns the default category of the dictionary
 */
orion.dictionary.getDefaultCategory = function() {
	if (!Meteor.userId()) {
		return _.first(_.keys(this.categories));
	}
	if (!Meteor.user()) {
		return null;
	}
	var found = null;
	_.keys(this.categories).map(function(category) {
		if (Meteor.user().hasPermission('dictionary.' + category)) {
			found = category
		}
	})
	return found;
};

/**
 * Returns the category of a definition
 */
orion.dictionary.getCategoryOf = function(name) {
	var found = null;
	var categories = this.categories;
	_.keys(orion.dictionary.categories).map(function(category) {
		if (_.contains(orion.dictionary.categories[category], name)) {
			found = category;
		}
	})
	return found;
};

/**
 * Returns the value of the definition.
 * If the definition doesn't exists it 
 * returns the defaultValue
 */
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

/**
 * Returns false when there are no definitions
 * in the dictionary
 */
orion.dictionary.isActive = function() {
	return _.keys(orion.dictionary.categories).length != 0;
}