Meteor.publish('pages', function (fields = ['title', 'url', 'createdAt']) {
  check(fields, [String]);
  var options = _.object(fields, Array(fields.length).fill(1));
  return orion.pages.collection.find({}, { fields: options });
});

Meteor.publish('page', function (url) {
  check(url, String);
  return orion.pages.collection.find({ url: url });
});

Meteor.publish('pageById', function (pageId) {
  check(pageId, String);
  return orion.pages.collection.find({ _id: pageId });
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
