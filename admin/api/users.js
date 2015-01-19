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