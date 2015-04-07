if (Meteor.isClient) {
	orion.admin.addSidebarTab({
		routeName: 'adminPagesIndex',
		navbarTitle: 'Pages',
		activeRouteRegex: 'adminPages',
		icon: 'tags',
		permission: 'pages'
	});
}

orion.users.permissions.add('pages');