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

Template.adminEntitiesIndex.events({
	'click tr': function(event) {
		var dataTable = $(event.target).closest('table').DataTable();
		var rowData = dataTable.row(event.currentTarget).data();
		Router.go('adminEntitiesUpdate', {
			_id: rowData._id,
			entity: Router.current().data().entity.name
		});
	}
})

Template.adminEntitiesIndex.rendered = function() {
	Session.set('adminEntitiesIndexShowTable', true);

	var toogleTable = function() {
		Session.set('adminEntitiesIndexShowTable', false);
		Meteor.setTimeout(function() {
			Session.set('adminEntitiesIndexShowTable', true);
		}, 1);
	}

	Deps.autorun(function () {
		Router.current()
		toogleTable();
	});
}