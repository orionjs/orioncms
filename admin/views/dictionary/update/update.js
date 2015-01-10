Template.adminDictionaryUpdate.helpers({
	getDoc: function() {
		return orion.dictionary.collection.findOne();
	},
	allCategories: function() {
		return _.keys(orion.dictionary.categories);
	},
	isActiveCategory: function() {
		return this == Router.current().data().category ? 'label-primary' : 'label-default';
	},
	getPermission: function() {
		return 'dictionary.' + this;
	}
});