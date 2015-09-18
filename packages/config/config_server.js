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
if (orion.config.collection.find(process.env.ORION_APPID?{_id:process.env.ORION_APPID}:{}).count() === 0) {
  orion.config.collection.insert(process.env.ORION_APPID?{_id:process.env.ORION_APPID}:{}, function(){
    console.log("Orion config initialized");
  });
}

/**
 * Publications of the config. Only for admins
 */
Meteor.publish('orion_config', function() {
  if (!this.userId) {
    return [];
  }
  if (Roles.userHasPermission(this.userId, 'config.update')) {
    return orion.config.collection.find(process.env.ORION_APPID?{_id:process.env.ORION_APPID}:{});
  }
});

/**
 * Get the config from the database only once
 */
orion.config.object = orion.config.collection.findOne(process.env.ORION_APPID?{_id:process.env.ORION_APPID}:{});

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

   var fields = { _id: 0 };

  //we needs to add in private fields so we can tell our query to not return them
  //so that private fields won't be injected and remain secure
  _.each(orion.config.getPrivateFields(), function(field) {
    fields[field] = 0;
  });

  var config = orion.config.collection.findOne(process.env.ORION_APPID?{_id:process.env.ORION_APPID}:{}, { fields: fields });

  Inject.obj('orion.config', config);
});
