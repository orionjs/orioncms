Template.adminEntitiesDelete.helpers({
	onSuccess: function () {
		return function (result) { 
			var name = Router.current().data().entity.name;
			Router.go('adminEntitiesIndex', {entity: name}); 
		};
	}
});