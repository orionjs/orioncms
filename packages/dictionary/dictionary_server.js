/**
 * If its on server, inserts the dictionary object
 */
if (orion.dictionary.find(process.env.ORION_APPID?{_id:process.env.ORION_APPID}:{}).count() === 0) {
  // orion.dictionary.remove(process.env.ORION_APPID?{_id:process.env.ORION_APPID}:{});
  orion.dictionary.insert(process.env.ORION_APPID?{_id:process.env.ORION_APPID}:{}, function(){
    console.log("Orion dictionary initialized");
  });
}

/**
 * Publications of the dictionary
 */
Meteor.publish('orion_dictionary', function() {
  return orion.dictionary.find(process.env.ORION_APPID?{_id:process.env.ORION_APPID}:{});
});
