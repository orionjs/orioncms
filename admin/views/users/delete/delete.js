Template.adminUsersDelete.events({
	'click .btn-delete': function () {
		Meteor.users.remove(this._id);
		Router.go('adminUsersIndex'); 
	}
});