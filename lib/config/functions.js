orion.config.getDefaultCategory = function() {
	return _.first(_.keys(this.categories));
};

orion.config.publicOptions = [];

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