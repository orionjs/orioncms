Meteor.users.helpers({
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

if (Meteor.isClient) {
	Template.registerHelper('doIHavePermission', function(key) {
		return Meteor.user().hasPermission(key);
	});
}
