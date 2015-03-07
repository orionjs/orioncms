Template.adminUsersCreate.helpers({
	permissions: function() {
		return orion.users.permissions.list;
	},
	isAdmin: function() {
		return Session.get('adminUsersCreateIsAdmin');
	},
	invitationId: function() {
		return Session.get('adminUsersCreateInvitationsId');
	}
});

Template.adminUsersCreate.events({
	'change [name=isadmin]': function (event) {
		Session.set('adminUsersCreateIsAdmin', $(event.target).is(':checked'));
	},
	'click .btn-create': function() {
		if ($('[name=isadmin]').is(':checked')) {
			var invitationId = orion.users.invitations.insert({ isAdmin: true, permissions: [] });
		} else {
			var permissions = [];
			$(".permission-checkbox input:checked").each(function(){
				permissions.push($(this).attr('name'));
			})
			var invitationId = orion.users.invitations.insert({ isAdmin: false, permissions: permissions });
		}
		Session.set('adminUsersCreateInvitationsId', invitationId);
	}
});


Template.adminUsersCreate.rendered = function () {
	Session.set('adminUsersCreateIsAdmin', false);
	Session.set('adminUsersCreateInvitationsId', null);
};