Meteor.publish('pages', function (url) {
  check(url, Match.Optional(String));
  return url ? orion.pages.collection.find({ url: url }) : orion.pages.collection.find();
});