Template.adminEntitiesIndex.helpers({

	settings: function () {
		var controller = Iron.controller();
		var defaultFields = controller.data().entity.options.defaultIndexTableFields;
		var fields = _.union(defaultFields, [{
				key: '_id',
				label: 'Edit',
				fn: function (value) {
				    return new Spacebars.SafeString('<a class="btn btn-primary btn-xs" href="' + Router.routes['adminEntitiesUpdate'].path({_id:value, entity: controller.data().entity.name}) + '">Edit</a>');
				}
			},
			{
				key: '_id',
				label: 'Delete',
				fn: function (value) {
				    return new Spacebars.SafeString('<a class="btn btn-danger btn-xs" href="' + Router.routes['adminEntitiesDelete'].path({_id:value, entity: controller.data().entity.name}) + '">Delete</a>');
				}
			}
		]);

		return {
			rowsPerPage: 20,
			showFilter: true,
			showNavigation: 'auto',
			fields: fields
		};
	}
});