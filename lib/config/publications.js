/**
 * Publications of the config. Only for admins
 *  
 * @param  object options Passed to the find() method
 * @return object
 */
Meteor.publish('config', function() {
	if (!this.userId) {
		return [];
	}
	var user = Meteor.users.findOne(this.userId);
	if (user.hasPermission('admin')) {
		return orion.config.collection.find();
	} 
	return []
});