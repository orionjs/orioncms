Template.adminAccountsInvitation.rendered = function () {
	Session.set('adminAccountsInvitationError', null);
};

Template.adminAccountsInvitation.helpers({
	error: function () {
		return Session.get('adminAccountsInvitationError');
	},
	getInvitation: function() {
		return Router.current().params._id;
	}
});

Template.adminAccountsInvitation.events({
	'submit form': function (event, template) {
		event.preventDefault();
		Session.set('adminAccountsInvitationError', null);

		var email = template.$("[name='email']").val(),
			name = template.$("[name='name']").val(),
			password = template.$("[name='password']").val(),
			passwordConfirm = template.$("[name='password-confirm']").val();

		if (!/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
			Session.set('adminAccountsInvitationError', 'The email is not valid');
			return;
		}

		if (password != passwordConfirm) {
			Session.set('adminAccountsInvitationError', 'Passwords must match');
			return;
		}

		Meteor.call('registerWithInvitation', {
			invitationId: Router.current().params._id,
			email: email,
			password: password,
			name: name
		}, function(error, result) {
			if (error) {
				Session.set('adminAccountsInvitationError', error.reason);
				console.log(error);
			} else {
				Meteor.loginWithPassword(email, password, function(error) {
					if (error) {
						Session.set('adminAccountsInvitationError', error.reason);
						console.log(error);
					} else {
						Router.go('adminDictionaryUpdate');
					}
				})
			}
		});
	}
});