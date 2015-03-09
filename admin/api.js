/**
 * Definition of the admin object.
 */
orion.admin = {
	sidebarTabs: [],
	userActions: [],
};

/**
 * Default subscriptions for all the admin panel.
 */
orion.admin.adminSubscriptions = [
	orion.subs.subscribe('dictionary'),
	orion.subs.subscribe('config'),
	orion.subs.subscribe('adminUsers')
];

/**
 * Add new subscriptions to all the admin panel.
 */
orion.admin.addAdminSubscription = function(func) {
	orion.admin.adminSubscriptions.push(func);
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