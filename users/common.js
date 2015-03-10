/**
 * Definition of the users object
 */
orion.users = {
	permissions: {
		defaultPermissions: [], 
		list: []
	}, 
};

/**
 * Adds a permission to the list of users permissions.
 */
orion.users.permissions.add = function(permission) {
	if (orion.users.permissions.list.indexOf(permission) == -1) {
		orion.users.permissions.list.push(permission);
	}
}

/**
 * Permissions users object.
 */
Meteor.users.allow({
	/**
	 * Only admin can change permissions.
	 */
	'update': function(userId, doc, fields, modifier) {
		var user = Meteor.users.findOne(userId);
		if (doc._id != userId && user.isAdmin) {
			var allowed = ['isAdmin', 'permissions']
			if (_.isEqual(_.union(allowed, fields), allowed)) {
				return true;
			}
		}

		return false
	},
	/**
	 * Only admin can remove users. 
	 * Admin can't remove themselves
	 */
	'remove': function(userId, doc) {
		var user = Meteor.users.findOne(userId);
		return userId && doc._id != userId  && user.isAdmin;
	}
});

/**
 * Helpers to the user object.
 */
Meteor.users.helpers({
	/**
	 * Check if the current user has permission for something.
	 */
	hasPermission: function(key, strict) {
		if (strict) {
			return _.contains(this.permissions, key);
		}

		if (!key) {
			return true;
		}

		if (this.isAdmin) {
			return true;
		}
		
		if (!this.permissions) {
			return false;
		}
		
		var has = false;
		this.permissions.map(function(permission) {
			var parts = permission.split('.');
			var num = parts.length;
			for (var i = 0; i < num; i++) {
				if (parts.join('.') == key) {
					has = true;
				}
				parts.pop();
			}
		})
		return has;
	}
});

/**
 * Helper for iron router to check if the user has permissions
 */
orion.users.ensureRoutePermissions = function(permissions) {
    return function(ironRouter) {
        ironRouter = this.url ? this : ironRouter;
        permissions = typeof permissions == 'string' ? [permissions] : permissions;
        if (Meteor.userId()) {
            var has = true;
            _.each(permissions, function(permission) {
                if (!Meteor.user().hasPermission(permission)) {
                    has = false;
                    
                }
            });
            if (has) {
                ironRouter.next();
            } else {
                ironRouter.render('adminExtrasNotAllowed');
            }
        } else {
            ironRouter.next();
        }
    }
}