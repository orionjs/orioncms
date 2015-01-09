orion.config.collection.allow({
	'insert': function(userId, doc) {
		return false;
	},
	'update': function(userId, doc, fields, modifier) {
		if (!userId) {
			return false;
		}
		var user = Meteor.users.findOne(userId);
		return user.hasPermission('admin');
	},
	'remove': function(userId, doc) {
		return false;
	}
});