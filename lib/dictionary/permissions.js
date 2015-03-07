orion.dictionary.collection.allow({
	'insert': function(userId, doc) {
		return false;
	},
	'update': function(userId, doc, fields, modifier) {
		var user = Meteor.users.findOne(userId);
		var canEdit = !!userId;
		fields.map(function(field) {
			var category = orion.dictionary.getCategoryOf(field);
			if (!user.hasPermission('dictionary.' + category)) {
				canEdit = false;
			}
		});
		return canEdit;
	},
	'remove': function(userId, doc) {
		return false;
	}
});