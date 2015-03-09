/**
 * adminAccountsInvitation
 */
orion.admin.accountsInvitationEvents = {
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
};

orion.admin.accountsInvitationHelpers = {
	error: function () {
		return Session.get('adminAccountsInvitationError');
	},
	getInvitation: function() {
		return Router.current().params._id;
	}
};

orion.admin.accountsInvitationRendered = function () {
	Session.set('adminAccountsInvitationError', null);
};

/**
 * adminAccountsLogin
 */
orion.admin.accountsLoginEvents = AccountsTemplates.atPwdFormEvents;

orion.admin.accountsLoginHelpers = _.extend(AccountsTemplates.atFormHelpers, AccountsTemplates.atTitleHelpers, AccountsTemplates.atPwdFormHelpers, AccountsTemplates.atPwdFormBtnHelpers)

/**
 * adminAccountsSetup
 */
orion.admin.accountsSetupEvents = {
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
}

orion.admin.accountsSetupHelpers = {
	error: function () {
		return Session.get('adminSetupIndexError');
	}
}

orion.admin.accountsSetupRendered = function () {
	Session.set('adminSetupIndexError', null);
};


