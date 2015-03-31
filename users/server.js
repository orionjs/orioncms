/**
 * Publications of the users. Only for admins
 */
Meteor.publish('adminUsers', function() {
	if (!this.userId) {
		return [];
	}
	var user = Meteor.users.findOne(this.userId);
	if (user.hasPermission('admin')) {
		return Meteor.users.find({}, { fields: { services: 0 } });
	} else {
		return [];
	}
});

/**
 * Adds necessary values to the new users
 */
Accounts.onCreateUser(function (options, user) {
	user.permissions = orion.users.permissions.defaultPermissions;
	user.profile = options.profile;
	user.registrationType = options.registrationType || 'register';

	/**
	 * Use this function to edit the new users
	 */
	if (orion.users.onCreateUser) {
        user = orion.users.onCreateUser(options, user);
    }

	return user;
});

/**
 * Methods
 */
Meteor.methods({
	/**
	 * To know if there is any account created
	 */
	accountsNumberIsCero: function() {
		return Meteor.users.find({}, { limit: 1 }).count() == 0
	},
	/**
	 * Creates the first user. 
	 * This user will be a admin.
	 * This function will not create a user if 
	 * there already exists one.
	 */
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
	/**
	 * Creates a new users with the invitation process
	 */
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

		orion.users.invitations.remove(options.invitationId);

		return userId;
	},
});

/**
 * Publish the permissions to the logged in user.
 */
Accounts.addAutopublishFields({
	forLoggedInUser: ['isAdmin', 'permissions'],
});

/**
 * Prevents error that made the user sign out.
 */
Meteor.publish(null, function() {
	if (this.userId) {
		return Meteor.users.find( {_id: this.userId}, { fields: { services: 0 } } );
	} else {
		return [];
	}
});