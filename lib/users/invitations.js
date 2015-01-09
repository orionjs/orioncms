orion.users.invitations = new Meteor.Collection('invitations');

orion.users.invitations.allow({
	'insert': function(userId, doc) {
		var user = Meteor.users.findOne(userId);
		return userId && user.isAdmin;
	},
	'update': function(userId, doc, fields, modifier) {
		return false;
	},
	'remove': function(userId, doc) {
		var user = Meteor.users.findOne(userId);
		return userId && user.isAdmin;
	}
});

InvitationsSchema = new SimpleSchema({
	isAdmin: {
		type: Boolean
	},
	permissions: {
		type: [String]
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
	createdBy: {
		type: String,
		autoform: {
			omit: true
		},
		autoValue: function() {
			if (this.isInsert) {
				return Meteor.userId();
			} else if (this.isUpsert) {
				return {$setOnInsert: Meteor.userId()};
			} else {
				this.unset();
			}
		}
	},
});

orion.users.invitations.attachSchema(InvitationsSchema);