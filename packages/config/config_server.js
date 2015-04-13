/**
 * Restarts the server after updates
 */
orion.config.collection.after.update(function (userId, doc, fieldNames, modifier, options) {
  // Timeout is necessary to no enter a infinit loop of restarts
  Meteor.setTimeout(function () {
    process.exit();
  }, 500);
});

/**
 * Creates one object in the config collection
 */
if (orion.config.collection.find().count() === 0) {
  orion.config.collection.insert({}, function(){
    console.log("Orion config initialized")
  });
}

/**
 * Publications of the config. Only for admins
 */
Meteor.publish(null, function() {
  /*if (!this.userId) {
    return [];
  }*/
  if (/*User is admin*/ true) {
    return orion.config.collection.find();
  } 
  return [];
});

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
  if (orion.config.getPublicFields().length == 0) {
    Inject.obj('orion.config', {});
    return;
  }
  var fields = { _id: 0 };
  _.each(orion.config.publicOptions, function(option) {
    fields[option] = 1;
  });
  Inject.obj('orion.config', orion.config.collection.findOne({}, { fields: fields }));
});