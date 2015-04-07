orion.filesystem.files = {};

orion.filesystem.files.collection = new Meteor.Collection('files');
orion.filesystem.files.collection.allow({
	'insert': function(userId, doc) {
        if(orion.filesystem.allowPublicUploads){
            return true;
        }
		if (!userId) {
			return false;
		}
		var user = Meteor.users.findOne(userId);
		if (!user.hasPermission('files.upload')) {
			return false;
		}
		return true;
	},
	'update': function(userId, doc, fields, modifier) {
		if (!userId) {
			return false;
		}
		var user = Meteor.users.findOne(userId);
		if (!user.hasPermission('files.upload')) {
			return false;
		}
		return true;
	},
	'remove': function(userId, doc) {
        if(orion.filesystem.allowPublicUploads){
            return true;
        }
		if (!userId) {
			return false;
		}
		var user = Meteor.users.findOne(userId);
		if (!user.hasPermission('files.delete')) {
			return false;
		}
		return userId;
	}
});

orion.filesystem.files.schema = new SimpleSchema({
	url: {
		type: String
	},
	isPrivate: {
		type: Boolean
	},
	canRemove: {
		type: Boolean
	},
	name: {
		type: String
	},
	folder: {
		type: String,
		optional: true,
		regEx: /^[a-zA-Z0-9-_]+[a-zA-Z0-9-_\/]*[a-zA-Z0-9-_]+$/,
	},
	meta: {
		type: Object,
        optional: true,
        blackbox: true
	},
	createdAt: {
		type: Date,
		autoValue: function() {
			if (this.isInsert) {
				return new Date;
			} else if (this.isUpsert) {
				return {$setOnInsert: new Date};
			} else {
				this.unset();
			}
		}
	},
	updatedAt: {
		type: Date,
		autoValue: function() {
			if (this.isUpdate) {
				return new Date();
			}
		},
		denyInsert: true,
		optional: true
	},
})

orion.filesystem.files.collection.attachSchema(orion.filesystem.files.schema);
