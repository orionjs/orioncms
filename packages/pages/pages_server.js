Meteor.publish('pages', function () {
  return orion.pages.collection.find();
});

Meteor.publish('page', function (url) {
  check(url, String);
  return orion.pages.collection.find({ url: url });
});
