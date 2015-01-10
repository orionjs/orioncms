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