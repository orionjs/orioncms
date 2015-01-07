orion.config = {
	collection: new Meteor.Collection('orionConfig'),
	schema: {},
	categories: {},
	object: {}
};


if (Meteor.isServer) {
	// Restarts the server after updates
	orion.config.collection.after.update(function (userId, doc, fieldNames, modifier, options) {
		Meteor.setTimeout(function () {
			console.log(userId, doc, fieldNames, modifier, options);
			process.exit();
		}, 500);
	});

	// Get the fetch the database only once
	orion.config.object = orion.config.collection.findOne();
}