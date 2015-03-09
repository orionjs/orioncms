/**
 * Check if the logged in users has permission for something.
 */
Template.registerHelper('doIHavePermission', function(key) {
	return Meteor.user().hasPermission(key);
});
