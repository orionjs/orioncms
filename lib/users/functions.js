if (Meteor.isServer) {
	Meteor.methods({
		accountsNumberIsCero: function() {
			return Meteor.users.find({}, { limit: 1 }).count() == 0
		},
		createFirstUser: function(options) {
			var email = options.email,
				password = options.password,
				name = options.name;

			if (Meteor.users.find({}, { limit: 1 }).count() != 0) {
				throw new Meteor.Error('account-exists', 'A account already exists');
			}

			var userId = Accounts.createUser({
				email: email,
				password: password
		    });

			Meteor.users.update(userId, {
				$set: {
					isAdmin: true, 
					registrationType: 'setup', 
					profile: {
						name: name
					}
				}
			});
			return userId;
		},
		registerWithInvitation: function(options) {
			var email = options.email,
				password = options.password,
				name = options.name,
				invitation = orion.users.invitations.findOne(options.invitationId);

			if (!invitation) {
				throw new Meteor.Error('invalid-invitation', 'The invitation code is invalid');
			}

			check(name, String);

			var userId = Accounts.createUser({
				email: email,
				password: password
		    });

			Meteor.users.update(userId, { 
				$set: {
					isAdmin: invitation.isAdmin, 
					permissions: invitation.permissions, 
					registrationType: 'invitation', 
					profile: {
						name: name
					}
				}
			});
			return userId;
		},
	});
}

Accounts.onCreateUser(function (options, user) {
	user.permissions = orion.users.permissions.defaultPermissions;
	user.profile = options.profile;
	user.registrationType = options.registrationType || 'register';
	return user;
});