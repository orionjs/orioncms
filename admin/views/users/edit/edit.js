Template.adminUsersEdit.helpers({
	permissions: function() {
		return orion.users.permissions.list;
	},
	isAdmin: function() {
		return Session.get('adminUsersEditIsAdmin');
	},
	hasPermission: function() {
		return Router.current().data().hasPermission(String(this), true);
	},
	itsMe: function() {
		return Meteor.userId() === this._id;
	}
});

Template.adminUsersEdit.events({
	'change [name=isadmin]': function (event) {
		Session.set('adminUsersEditIsAdmin', $(event.target).is(':checked'));
	},
	'click .btn-save': function() {
		if ($('[name=isadmin]').is(':checked')) {
			Meteor.users.update(this._id, { $set: { isAdmin: true, permissions: [] } })
		} else {
			var permissions = [];
			$(".permission-checkbox input:checked").each(function(){
				permissions.push($(this).attr('name'));
			})
			Meteor.users.update(this._id, { $set: { isAdmin: false, permissions: permissions } })
		}
	}
});

Template.adminUsersEdit.rendered = function () {
	Session.set('adminUsersEditIsAdmin', this.data.isAdmin);
};