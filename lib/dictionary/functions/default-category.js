orion.dictionary.getDefaultCategory = function() {
	if (!Meteor.userId()) {
		return _.first(_.keys(this.categories));
	}
	var found = null;
	_.keys(this.categories).map(function(category) {
		if (Meteor.user().hasPermission('dictionary.' + category)) {
			found = category
		}
	})
	return found;
};

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