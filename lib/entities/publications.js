/**
 * Publication of the entitites 
 * 
 * @param  string name The name of the entity
 * @param  object options Passed to the find() method
 * @return object
 */
Meteor.publish('entity', function(name, options) {
	options = options ? options : {};
	return orion.entities[name].collection.find(options);
});