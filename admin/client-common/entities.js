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

orion.admin.entitiesCreateHelpers = {
	getFields: function() {
		var entity = Router.current().data().entity;
		var item = Router.current().data().item;
		if (entity) {
			if (!Meteor.userId()) {
				return;
			}

			var user = Meteor.users.findOne(Meteor.userId());

			if (user.hasPermission('entity.' + entity.name + '.all')) {
				return;
			}

			if (user.hasPermission('entity.' + entity.name + '.personal')) {
				return;
			}

			for (var i = 0; i < entity.customPermissions.length; i++) {
				var permission = entity.customPermissions[i];
				if (user.hasPermission('entity.' + entity.name + '.' + permission.name)) {
					if (permission.fields) {
						return permission.fields(Meteor.userId());
					}
				}
			}
		}
		return;
	}
}

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
		if ($(event.target).is('a') || $(event.target).is('button')) {
			return;
		}
		var dataTable = $(event.target).closest('table').DataTable();
		var rowData = dataTable.row(event.currentTarget).data();
		if (rowData) {
			Router.go('adminEntitiesUpdate', {
				_id: rowData._id,
				entity: Router.current().data().entity.name
			});
		}
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
	},
	canCreateEntity: function() {
		if (this.entity) {
			if (!Meteor.userId()) {
				return false;
			}

			var user = Meteor.users.findOne(Meteor.userId());

			if (user.hasPermission('entity.' + this.entity.name + '.all')) {
				return true;
			}

			if (user.hasPermission('entity.' + this.entity.name + '.personal')) {
				return true;
			}

			for (var i = 0; i < this.entity.customPermissions.length; i++) {
				var permission = this.entity.customPermissions[i];
				if (user.hasPermission('entity.' + this.entity.name + '.' + permission.name)) {
					return permission.create(Meteor.userId());
				}
			}
		}
		return false;
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
	},
	getFields: function() {
		var entity = Router.current().data().entity;
		var item = Router.current().data().item;
		if (entity) {
			if (!Meteor.userId()) {
				return;
			}

			var user = Meteor.users.findOne(Meteor.userId());

			if (user.hasPermission('entity.' + entity.name + '.all')) {
				return;
			}

			if (user.hasPermission('entity.' + entity.name + '.personal')) {
				return;
			}

			for (var i = 0; i < entity.customPermissions.length; i++) {
				var permission = entity.customPermissions[i];
				if (user.hasPermission('entity.' + entity.name + '.' + permission.name)) {
					if (permission.fields) {
						return permission.fields(Meteor.userId());
					}
				}
			}
		}
		return;
	},
	canUpdateEntity: function() {
		var entity = Router.current().data().entity;
		var item = Router.current().data().item;
		if (entity) {
			if (!Meteor.userId()) {
				return false;
			}

			var user = Meteor.users.findOne(Meteor.userId());

			if (user.hasPermission('entity.' + entity.name + '.all')) {
				return true;
			}

			if (user.hasPermission('entity.' + entity.name + '.personal')) {
				return true;
			}

			for (var i = 0; i < entity.customPermissions.length; i++) {
				var permission = entity.customPermissions[i];
				if (user.hasPermission('entity.' + entity.name + '.' + permission.name)) {
					return permission.update(Meteor.userId(), item);
				}
			}
		}
		return false;
	},
	canRemoveEntity: function() {
		var entity = Router.current().data().entity;
		var item = Router.current().data().item;
		if (entity) {
			if (!Meteor.userId()) {
				return false;
			}

			var user = Meteor.users.findOne(Meteor.userId());

			if (user.hasPermission('entity.' + entity.name + '.all')) {
				return true;
			}

			if (user.hasPermission('entity.' + entity.name + '.personal')) {
				return true;
			}

			for (var i = 0; i < entity.customPermissions.length; i++) {
				var permission = entity.customPermissions[i];
				if (user.hasPermission('entity.' + entity.name + '.' + permission.name)) {
					return permission.remove(Meteor.userId(), item);
				}
			}
		}
		return false;
	}
};