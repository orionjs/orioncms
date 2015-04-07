Template.adminPagesDelete.helpers({
	onSuccess: function () {
		return function (result) { 
			Router.go('adminPagesIndex'); 
		};
	}
})