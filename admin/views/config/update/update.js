Template.adminConfigUpdate.helpers({
	getDoc: function() {
		return orion.config.collection.findOne();
	},
	allCategories: function() {
		return _.keys(orion.config.categories);
	},
	isActiveCategory: function() {
		return this == Router.current().data().configCategory ? 'label-primary' : 'label-default';
	}
});

Template.adminConfigUpdate.events({
	'focus [data-type=secret]': function (event) {
		$(event.target).attr('type', 'text');
	},
	'blur [data-type=secret]': function(event) {
		$(event.target).attr('type', 'password');
	}
});