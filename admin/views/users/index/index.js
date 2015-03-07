Template.adminUsersIndex.rendered = function() {
	Session.set('adminUsersIndexErrors', {});
	Session.set('adminUsersIndexResponses', {});
}

Template.adminUsersIndexUser.helpers({
	itsMe: function () {
		return Meteor.userId() === this._id;
	},
	actions: function() {
		return orion.admin.userActions;
	},
	isAdmin: function() {
		return Template.instance().data.isAdmin;
	}, 
	getError: function() {
		return Session.get('adminUsersIndexErrors') && Session.get('adminUsersIndexErrors')[this._id];
	},
	getResponse: function() {
		return Session.get('adminUsersIndexResponses') && Session.get('adminUsersIndexResponses')[this._id];
	}
});

Template.adminUsersIndexUserAction.events({
	'click .btn': function(event, template) {
		var action = this;
		var user = Template.parentData(1);
		if (action.route) {
			Router.go(action.route, user);
		} else if (action.method) {
			Meteor.call(action.method, user, function(error, response) {
				if (error) {
					console.log(error);
					var errors = Session.get('adminUsersIndexErrors')
					errors[user._id] = error;
					Session.set('adminUsersIndexErrors', errors);
				} else {
					if (response.message) {
						var responses = Session.get('adminUsersIndexResponses')
						responses[user._id] = response.message;
						Session.set('adminUsersIndexResponses', responses);
						var errors = Session.get('adminUsersIndexErrors')
						delete errors[user._id];
						Session.set('adminUsersIndexErrors', errors);
					}
					if (action.callback) {
						action.callback(response);
					}
				}
			})
		}
	}
})