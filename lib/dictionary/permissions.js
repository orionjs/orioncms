orion.dictionary.collection.allow({
	'insert': function(userId, doc) {
		return false;
	},
	'update': function(userId, doc, fields, modifier) {
		return userId;
	},
	'remove': function(userId, doc) {
		return false;
	}
});