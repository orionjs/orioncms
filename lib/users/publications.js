/**
 * Publications of the users. Only for admins
 */
Meteor.publish('adminUsers', function() {
	if (!this.userId) {
		return [];
	}
	var user = Meteor.users.findOne(this.userId);
	if (user.hasPermission('admin')) {
		return Meteor.users.find();
	} else {
		return Meteor.users.find({_id: this.userId});
	}
});