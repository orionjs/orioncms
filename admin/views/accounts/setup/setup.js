Template.adminAccountsSetup.rendered = function () {
	Session.set('adminSetupIndexError', null);
};

Template.adminAccountsSetup.helpers({
	error: function () {
		return Session.get('adminSetupIndexError');
	}
});

Template.adminAccountsSetup.events({
	'submit form': function (event, template) {
		event.preventDefault();
		Session.set('adminSetupIndexError', null);

		var email = template.$("[name='email']").val(),
			name = template.$("[name='name']").val(),
			password = template.$("[name='password']").val(),
			passwordConfirm = template.$("[name='password-confirm']").val();

		if (!/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
			Session.set('adminSetupIndexError', 'The email is not valid');
			return;
		}

		if (password != passwordConfirm) {
			Session.set('adminSetupIndexError', 'Passwords must match');
			return;
		}

		Meteor.call('createFirstUser', {
			email: email,
			password: password,
			name: name
		}, function(error, result) {
			if (error) {
				Session.set('adminSetupIndexError', error.reason);
				console.log(error);
			} else {
				Meteor.loginWithPassword(email, password, function(error) {
					if (error) {
						Session.set('adminSetupIndexError', error.reason);
						console.log(error);
					} else {
						Router.go('adminDictionaryUpdate');
					}
				})
			}
		});
	}
});