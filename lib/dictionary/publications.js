/**
 * Publications of the dictionary
 *  
 * @param  object options Passed to the find() method
 * @return object
 */
Meteor.publish('dictionary', function(options) {
	options = options ? options : {};
	return orion.dictionary.collection.find(options);
});