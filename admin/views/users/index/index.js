Template.adminUsersIndexUser.helpers({
	itsMe: function () {
		return Meteor.userId() === this._id;
	}
});