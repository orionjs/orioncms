Router.route('/admin/files', {
	name: 'adminFilesIndex',
	controller: orion.RouteController,  
	data: function() {
		return this.params;
	}
});

Router.route('/admin/files/create', {
	name: 'adminFilesCreate',
	controller: orion.RouteController,  
});

Router.route('/admin/files/:_id', {
	name: 'adminFilesShow',
	controller: orion.RouteController, 
	data: function() {
		return {
			file: orion.filesystem.files.get(this.params._id)
		}
	} 
});

Router.route('/admin/files/:_id/delete', {
	name: 'adminFilesDelete',
	controller: orion.RouteController, 
	data: function() {
		return {
			file: orion.filesystem.files.get(this.params._id)
		}
	} 
});

/**
 * Ensure the user is signed in before he can view the admin
 */
Router.plugin('ensureSignedIn', {
	only: [
		'adminFilesIndex',
    	'adminFilesShow',
    	'adminFilesDelete',
    	'adminFilesCreate'
	]
});

Router.onBeforeAction(orion.users.ensureRoutePermissions('files.folders'), {
    only: [
    	'adminFilesIndex',
    	'adminFilesShow',
    	'adminFilesDelete',
    	'adminFilesCreate'
    ]
});