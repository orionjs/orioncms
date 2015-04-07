/**
 * Definition of the admin object.
 */
orion.admin = {
	sidebarTabs: [],
	userActions: [],
	adminSubscriptions: []
};

/**
 * Add new subscriptions to all the admin panel.
 */
orion.admin.addAdminSubscription = function() {
	orion.admin.adminSubscriptions.push(arguments);
}

/**
 * Add default subscriptions of the admin panel
 */

orion.admin.addAdminSubscription('config');
orion.admin.addAdminSubscription('adminUsers');

/**
 * Get the admin subscriptions
 */

orion.admin.getAdminSubscriptions = function() {
	var subscriptions = [];
	for(var i  = 0; i < orion.admin.adminSubscriptions.length; i++) {
		var args = orion.admin.adminSubscriptions[i];
		var subscription = orion.subs.subscribe.apply(orion.subs, args);
		subscriptions.push(subscription)
	}
	return subscriptions;
}

/**
 * Add a tab to the admin panel.
 */
orion.admin.addSidebarTab = function(options) {
	options = _.extend({
		activeRouteRegex: options.routeName,
		icon: 'plug'
	}, options);

	if (!options.routeName) {
		throw "Route name is required";
	} 

	if (!options.navbarTitle) {
		throw "Navbar Title name is required";
	} 

	orion.admin.sidebarTabs.push(options);
}

/**
 * Adds a button to next to the user in the list of users.
 */
orion.admin.addUserAction = function(options) {
	options = _.extend({
		forAdmins: false, 
		forUsers: true, 
		btnClass: 'btn-primary'
	}, options);

	if (!options.title) {
		throw "Title is required";
	} 

	if (!options.route && !options.method) {
		throw "Route or method are required";
	} 

	orion.admin.userActions.push(options);
}