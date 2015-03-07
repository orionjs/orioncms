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
			process.exit();
		}, 500);
	});

	// Get the fetch the database only once
	orion.config.object = orion.config.collection.findOne();

	// Send the data to the client (only public) after all config are created
	Meteor.startup(function () {
		if (orion.config.publicOptions.length == 0) {
			Inject.obj('orion.config', {});
			return;
		}
		var fields = { _id: 0 };
		_.each(orion.config.publicOptions, function(option) {
			fields[option] = 1;
		});
		Inject.obj('orion.config', orion.config.collection.findOne({}, { fields: fields }));
	});
} else {
	orion.config.object = Injected.obj('orion.config');
}