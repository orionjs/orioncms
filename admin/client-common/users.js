/**
 * adminUsersCreate
 */
orion.admin.usersCreateEvents = {
	'change [name=isadmin]': function (event) {
		Session.set('adminUsersCreateIsAdmin', $(event.target).is(':checked'));
	},
	'click .btn-create': function() {
		if ($('[name=isadmin]').is(':checked')) {
			var invitationId = orion.users.invitations.insert({ isAdmin: true, permissions: [] });
		} else {
			var permissions = [];
			$(".permission-checkbox input:checked").each(function(){
				permissions.push($(this).attr('name'));
			})
			var invitationId = orion.users.invitations.insert({ isAdmin: false, permissions: permissions });
		}
		Session.set('adminUsersCreateInvitationsId', invitationId);
	}
};

orion.admin.usersCreateHelpers = {
	permissions: function() {
		return orion.users.permissions.list;
	},
	isAdmin: function() {
		return Session.get('adminUsersCreateIsAdmin');
	},
	invitationId: function() {
		return Session.get('adminUsersCreateInvitationsId');
	}
};

orion.admin.usersCreateRendered = function () {
	Session.set('adminUsersCreateIsAdmin', false);
	Session.set('adminUsersCreateInvitationsId', null);
};

/**
 * adminUsersDelete
 */
orion.admin.usersDeleteEvents = {
	'click .btn-delete': function () {
		Meteor.users.remove(this._id);
		Router.go('adminUsersIndex'); 
	}
}

/**
 * adminUsersEdit
 */
orion.admin.usersEditEvents = {
	'change [name=isadmin]': function (event) {
		Session.set('adminUsersEditIsAdmin', $(event.target).is(':checked'));
	},
	'click .btn-save': function() {
		if ($('[name=isadmin]').is(':checked')) {
			Meteor.users.update(this._id, { $set: { isAdmin: true, permissions: [] } })
		} else {
			var permissions = [];
			$(".permission-checkbox input:checked").each(function(){
				permissions.push($(this).attr('name'));
			})
			Meteor.users.update(this._id, { $set: { isAdmin: false, permissions: permissions } })
		}
	}
};

orion.admin.usersEditHelpers = {
	permissions: function() {
		return orion.users.permissions.list;
	},
	isAdmin: function() {
		return Session.get('adminUsersEditIsAdmin');
	},
	hasPermission: function() {
		return Router.current().data().hasPermission(String(this), true);
	},
	itsMe: function() {
		return Meteor.userId() === this._id;
	}
};

orion.admin.usersEditRendered = function () {
	Session.set('adminUsersEditIsAdmin', this.data.isAdmin);
};

/**
 * adminUsersIndex
 */
orion.admin.usersIndexRendered = function() {
	Session.set('adminUsersIndexErrors', {});
	Session.set('adminUsersIndexResponses', {});
};

/**
 * adminUsersIndexUser
 */
orion.admin.usersIndexUserHelpers = {
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
}

/**
 * adminUsersIndexUserAction
 */
orion.admin.usersIndexUserActionEvents = {
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
}


