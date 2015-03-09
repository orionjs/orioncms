/**
 * adminEntitiesCreate
 */
AutoForm.hooks({
	createEntityForm: {
		onSuccess: function(operation, result, template) {
			var name = Router.current().data().entity.name;
			Router.go('adminEntitiesIndex', {entity: name});
		}
	}
});

/**
 * adminEntitiesDelete
 */
orion.admin.entitiesDeleteHelpers = {
	onSuccess: function () {
		return function (result) { 
			var name = Router.current().data().entity.name;
			Router.go('adminEntitiesIndex', {entity: name}); 
		};
	}
}

/**
 * adminEntitiesIndex
 */
orion.admin.entitiesIndexEvents = {
	'click tr': function(event) {
		var dataTable = $(event.target).closest('table').DataTable();
		var rowData = dataTable.row(event.currentTarget).data();
		Router.go('adminEntitiesUpdate', {
			_id: rowData._id,
			entity: Router.current().data().entity.name
		});
	}
}

orion.admin.entitiesIndexHelpers = {
	table: function() {
		if (this.entity) {
			return this.entity.table;
		}
		return null;
	},
	showTable: function() {
		return Session.get('adminEntitiesIndexShowTable');
	}
}

orion.admin.entitiesIndexRendered = function() {
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

/**
 * adminEntitiesUpdate
 */
AutoForm.hooks({
	updateEntityForm: {
		onSuccess: function(operation, result, template) {
			var name = Router.current().data().entity.name;
			Router.go('adminEntitiesIndex', {entity: name});
		}
	}
});

orion.admin.entitiesUpdateEvents = {
	'click #submit-btn': function() {
		$("#updateEntityForm").submit();
	}
};

orion.admin.entitiesUpdateHelpers = {
	getEntity: function () {
		return Router.current().data().entity.name;
	}
};