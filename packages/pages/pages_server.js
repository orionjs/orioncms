Meteor.publish('pages', function () {
  return orion.pages.collection.find();
});

Meteor.publish('page', function (url) {
  check(url, String);
  return orion.pages.collection.find({ url: url });
});

Meteor.startup(function() {
  orion.pages.collection._ensureIndex({ url: 1 }, { unique: 1 });
});

Meteor.methods({
  orion_pageWithUrl: function(url) {
    check(url, String);
    return orion.pages.collection.findOne({ url: url });
  }
})
