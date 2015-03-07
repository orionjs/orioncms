AutoForm.hooks({
	updateEntityForm: {
		onSuccess: function(operation, result, template) {
			var name = Router.current().data().entity.name;
			Router.go('adminEntitiesIndex', {entity: name});
		}
	}
});

Template.adminEntitiesUpdate.helpers({
	getEntity: function () {
		return Router.current().data().entity.name;
	}
})

Template.adminEntitiesUpdate.events({
	'click #submit-btn': function() {
		$("#updateEntityForm").submit();
	}
})