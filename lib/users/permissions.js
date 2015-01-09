Meteor.users.allow({
	'update': function(userId, doc, fields, modifier) {
		var user = Meteor.users.findOne(userId);
		if (doc._id != userId && user.isAdmin) {
			var allowed = ['isAdmin', 'permissions']
			if (_.isEqual(_.union(allowed, fields), allowed)) {
				return true;
			}
		}

		return false
	},
	'remove': function(userId, doc) {
		var user = Meteor.users.findOne(userId);
		return userId && doc._id != userId  && user.isAdmin;
	}
});

if (Meteor.isServer) {
	Accounts.addAutopublishFields({
		forLoggedInUser: ['isAdmin', 'permissions'],
	});
}

orion.users.permissions = {

}

orion.users.permissions.defaultPermissions = [];

orion.users.permissions.list = [];

orion.users.permissions.add = function(permission) {
	if (orion.users.permissions.list.indexOf(permission) == -1) {
		orion.users.permissions.list.push(permission);
	}
}