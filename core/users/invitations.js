/**
 * Invitations object
 */
orion.users.invitations = new Meteor.Collection('invitations');

/**
 * Invitation permissions
 */
orion.users.invitations.allow({
	/**
	 * Only admins can send invitations
	 */
	'insert': function(userId, doc) {
		var user = Meteor.users.findOne(userId);
		return userId && user.isAdmin;
	},
	/**
	 * Invitations are automatically updated
	 */
	'update': function(userId, doc, fields, modifier) {
		return false;
	},
	/**
	 * Only admins can remove invitations
	 */
	'remove': function(userId, doc) {
		var user = Meteor.users.findOne(userId);
		return userId && user.isAdmin;
	}
});

/**
 * Invitations Schema
 */
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