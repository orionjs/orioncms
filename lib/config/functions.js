orion.config.getDefaultCategory = function() {
	return _.first(_.keys(this.categories));
};

orion.config.add = function(name, category, options) {
	this.categories[category] = this.categories[category] || [];
	options = _.extend({
		secret: false
	}, options || {});

	this.categories[category].push(name);
	this.schema[name] = {
		type: String,
		label: name,
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

orion.config.get = function(name) {
	var object = Meteor.isServer ? this.object : this.collection.findOne();
	if (object) {
		return object[name];
	}
	return undefined;
}