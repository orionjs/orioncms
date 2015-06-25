/**
 * Restarts the server after updates
 */
orion.config.collection.after.update(function (userId, doc, fieldNames, modifier, options) {
  // Timeout is necessary to no enter a infinit loop of restarts
  Meteor.setTimeout(function () {
    console.log('Updating Orion config');
    process.exit();
  }, 500);
});

/**
 * Creates one object in the config collection
 */
if (orion.config.collection.find().count() === 0) {
  orion.config.collection.insert({}, function(){
    console.log("Orion config initialized");
  });
}

/**
 * Publications of the config. Only for admins
 */
Meteor.publish(null, function() {
  if (!this.userId) {
    return [];
  }
  if (Roles.userHasPermission(this.userId, 'config.update')) {
    return orion.config.collection.find();
  }
}, { is_auto: true });

/**
 * Get the config from the database only once
 */
orion.config.object = orion.config.collection.findOne();

/**
 * Send the data to the client (only public values).
 * It uses the injection method (meteorhacks:inject-initial) not
 * the publish/subcribe, because this is not meant to be reactive
 * and the values should be on the client when it starts.
 */
Meteor.startup(function () {
  if (!orion.config.getPublicFields()) {
    Inject.obj('orion.config', {});
    return;
  }

  //query config object, then remove
  //the _id field and any other fields that are not
  //set to {public: true}
  var config = orion.config.collection.findOne({});
  delete config._id;

  var privateFields = orion.config.getPrivateFields();

  for (var i = 0; i < privateFields.length; i++) {
    delete config[privateFields[i]];
  }

  Inject.obj('orion.config', config);
});
