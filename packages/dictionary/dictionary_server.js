/**
 * If its on server, inserts the dictionary object
 */
if (orion.dictionary.find().count() === 0) {
  orion.dictionary.insert({}, function(){
    console.log("Orion dictionary initialized")
  });
}

/**
 * Publications of the dictionary
 */
Meteor.publish(null, function() {
  return orion.dictionary.find();
});