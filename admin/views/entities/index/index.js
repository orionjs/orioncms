Template.adminEntitiesIndex.helpers({
	table: function() {
		if (this.entity) {
			return this.entity.table;
		}
		return null;
	},
	showTable: function() {
		return Session.get('adminEntitiesIndexShowTable');
	}
});

Template.adminEntitiesIndex.rendered = function() {
	Session.set('adminEntitiesIndexShowTable', true);

	var toogleTable = function() {
		Session.set('adminEntitiesIndexShowTable', false);
		Meteor.setTimeout(function() {
			Session.set('adminEntitiesIndexShowTable', true);
		}, 10);
	}

	Deps.autorun(function () {
		Router.current()
		toogleTable();
	});
}

Template.adminEntitiesIndexTableActions.helpers({
	getEntity: function () {
		return Router.current().data().entity.name;
	}
});