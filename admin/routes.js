/**
 * Ensure that we're authenticated for admin routes
 */
Router.plugin('ensureSignedIn', {
	only: [
		'admin',
		'adminAccountsSetup',
		'adminAccountsInvitation',
		'adminDictionaryUpdate',
		'adminUsersIndex',
		'adminUsersCreate',
		'adminUsersEdit',
		'adminUsersDelete',
		'adminConfigUpdate',
		'adminEntitiesIndex',
		'adminEntitiesCreate',
		'adminEntitiesUpdate',
		'adminEntitiesDelete'
	]
});

/**
 * Creates the orion route controller
 */
OrionRouteController = RouteController.extend({
	layoutTemplate: 'adminLayout',
	loadingTemplate: 'adminLoading',
	waitOn: function () {
		return orion.admin.adminSubscriptions;
	},
	onAfterAction: function() {
		if (!Meteor.isClient) {
			return;
		}
		SEO.set({
			title: orion.dictionary.get('siteName') + ' Admin Panel',
			link: {
				icon: 'https://s3.amazonaws.com/meteor-cms-default/orionjs/favicon.ico',
			}
		});
	}
});

/**
 * The home route for the admin, redirects to 
 * dictionaryUpdate or create account.
 */
Router.route('/admin', {
	name: 'admin',
	action: function() {
		var self = this;
		Meteor.call('accountsNumberIsCero', function(error, response){
			if (response) {
				self.redirect('adminAccountsSetup');
			} else {
				self.redirect('adminDictionaryUpdate');
			}
		})
	}
});

/**
 * Setup, create the first account
 */
Router.route('/admin/setup', {
	name: 'adminAccountsSetup',
	layoutTemplate: 'outAdminLayout',
	loadingTemplate: 'adminLoading',
});

/**
 * Create a account with invitation
 */
Router.route('/admin/create-account/:_id', {
	name: 'adminAccountsInvitation',
	layoutTemplate: 'outAdminLayout',
	loadingTemplate: 'adminLoading',
});

/**
 * Update the dictionary
 * if category is not specified uses the first
 */
Router.route('/admin/dictionary/:category?', {
	name: 'adminDictionaryUpdate',
	controller: OrionRouteController,  
	onBeforeAction: function() {
		var permission = this.params.category ? 'dictionary.' + this.params.category : 'dictionary';
		return orion.users.ensureRoutePermissions(permission)(this);
	},
	data: function() {
		if (this.params.category) {
			return {
				category: this.params.category,
				fields: orion.dictionary.categories[this.params.category]
			}
		} else {
			return {
				category: orion.dictionary.getDefaultCategory(),
				fields: orion.dictionary.categories[orion.dictionary.getDefaultCategory()]
			}
		}
	}
});

/**
 * List users
 */
Router.route('/admin/users', {
	name: 'adminUsersIndex',
	controller: OrionRouteController,  
	onBeforeAction: orion.users.ensureRoutePermissions('admin'),
	data: function() {
		return Meteor.users.find();
	}
});

/**
 * Invite users
 */
Router.route('/admin/users/invite', {
	name: 'adminUsersCreate',
	controller: OrionRouteController,  
	onBeforeAction: orion.users.ensureRoutePermissions('admin')
});

/**
 * Edit a user
 */
Router.route('/admin/users/:_id/edit', {
	name: 'adminUsersEdit',
	controller: OrionRouteController,  
	onBeforeAction: orion.users.ensureRoutePermissions('admin'), 
	data: function() {
		return Meteor.users.findOne(this.params._id);
	}
});

/**
 * Delete a user
 */
Router.route('/admin/users/:_id/delete', {
	name: 'adminUsersDelete',
	controller: OrionRouteController,  
	onBeforeAction: orion.users.ensureRoutePermissions('admin'), 
	data: function() {
		return Meteor.users.findOne(this.params._id);
	}
});

/**
 * Update the config. Only admins.
 * If category is not specified uses the first.
 */
Router.route('/admin/config/:configCategory?', {
	name: 'adminConfigUpdate',
	controller: OrionRouteController,  
	onBeforeAction: orion.users.ensureRoutePermissions('admin'),
	data: function() {
		if (this.params.configCategory) {
			return {
				configCategory: this.params.configCategory,
				fields: orion.config.categories[this.params.configCategory]
			}
		} else {
			return {
				configCategory: orion.config.getDefaultCategory(),
				fields: orion.config.categories[orion.config.getDefaultCategory()]
			}
		}
	}
});

/**
 * List a entity items
 */
Router.route('/admin/e/:entity/', {
	name: 'adminEntitiesIndex',
	controller: OrionRouteController,  
	onBeforeAction: function() {
		return orion.users.ensureRoutePermissions('entity.' + this.params.entity)(this);
	},
	data: function() {
		return {
			entity: orion.entities[this.params.entity]
		}
	}
});

/**
 * Create a entity item
 */
Router.route('/admin/e/:entity/create', {
	name: 'adminEntitiesCreate',
	controller: OrionRouteController,  
	onBeforeAction: function() {
		return orion.users.ensureRoutePermissions('entity.' + this.params.entity)(this);
	},
	data: function() {
		return {
			entity: orion.entities[this.params.entity]
		}
	}
});

/**
 * Update a entity item
 */
Router.route('/admin/e/:entity/:_id/update', {
	name: 'adminEntitiesUpdate',
	controller: OrionRouteController,  
	onBeforeAction: function() {
		return orion.users.ensureRoutePermissions('entity.' + this.params.entity)(this);
	},
	waitOn: function () {
		return orion.subs.subscribe('entity', this.params.entity, { _id: this.params._id });
	},
	data: function() {
		var entity = orion.entities[this.params.entity];
		return {
			entity: entity,
			item: entity.collection.findOne(this.params._id)
		}
	}
});

/**
 * Delete a entity item
 */
Router.route('/admin/e/:entity/:_id/delete', {
	name: 'adminEntitiesDelete',
	controller: OrionRouteController,  
	onBeforeAction: function() {
		return orion.users.ensureRoutePermissions('entity.' + this.params.entity)(this);
	},
	waitOn: function () {
		return orion.subs.subscribe('entity', this.params.entity, { _id: this.params._id });
	},
	data: function() {
		var entity = orion.entities[this.params.entity];
		return {
			entity: entity,
			item: entity.collection.findOne(this.params._id)
		}
	}
});