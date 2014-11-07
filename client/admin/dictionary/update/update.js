Template.adminDictionaryUpdate.helpers({
	allCategories: function() {
		return _.keys(cms.dictionary.categories);
	},
	isActiveCategory: function() {
		if (this == Router.current().data().category) {
			return 'active';
		}
	}
});