/**
 * Definition of the config object
 */
orion.config = {
	collection: new Meteor.Collection('orionConfig'),
	schema: {},
	categories: {},
	object: {},
	publicOptions: []
};

/**
 * Permissions for the dictionary.
 */
orion.config.collection.allow({
	/**
	 * No one can insert a config object
	 * becouse it only uses one and its created
	 * automatically.
	 */
	'insert': function(userId, doc) {
		return false;
	},
	/**
	 * Only admins can edit the config.
	 */
	'update': function(userId, doc, fields, modifier) {
		if (!userId) {
			return false;
		}
		var user = Meteor.users.findOne(userId);
		return user.hasPermission('admin');
	},
	/**
	 * No one can remove a config object
	 * becouse it only uses one.
	 */
	'remove': function(userId, doc) {
		return false;
	}
});

/**
 * Returns the default category
 */
orion.config.getDefaultCategory = function() {
	return _.first(_.keys(this.categories));
};

/**
 * Function to add a config.
 * This just modifies the schema of the config object
 * and adds the form in the admin panel.
 */
orion.config.add = function(name, category, options) {
	if (!this.categories[category]) {
		this.categories[category] = [];
	}

	options = _.extend({
		type: String,
		secret: false,
		label: name,
		public: false
	}, options || {});

	if (options.public) {
		this.publicOptions.push(name);
	} 

	this.categories[category].push(name);
	this.schema[name] = {
		type: options.type,
		label: options.label,
		optional: true,
	};

	if (options.secret) {
		this.schema[name].autoform = {
			type: 'password',
			'data-type': 'secret',
		}
	}

	this.collection.attachSchema(new SimpleSchema(this.schema));
};

/**
 * Returns the value of the config.
 * If the config doesn't exists it 
 * returns the defaultValue
 */
orion.config.get = function(name, defaultValue) {
	var config = _.clone(this.object);
	name = name.split(".");

	try {
		for (var i = 0; i < name.length; i++) {
			if (name[i] in config) {
				config = config[name[i]];
			} else {
				return defaultValue;
			}
		}
	} catch(error) {
		return defaultValue;
	}

	return config ? config : defaultValue;
}