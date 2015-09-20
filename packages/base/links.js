orion.links = {};
orion.links = new Meteor.Collection(null); //orion.links._collection = orion.links; // Backwards compatibility

orion.links.attachSchema(new SimpleSchema({
  index: {
    type: Number,
    optional: true
  },
  identifier: {
    type: String,
    regEx: /^[a-z0-9A-Z_-]+$/
  },
  parent: {
    type: String,
    optional: true,
    regEx: /^[a-z0-9A-Z_-]+$/
  },
  title: {
    type: String
  },
  routeName: {
    type: String,
    optional: true
  },
  activeRouteRegex: {
    type: String,
    optional: true
  },
  permission: {
    type: String,
    optional: true
  }
}));

orion.links.add = function(options) {
  var self = this;
  Tracker.autorun(function() {
    if (_.isFunction(options.title)) {
      options.title = options.title();
    }
    self.upsert({ identifier: options.identifier }, { $set: options });
  });
};

orion.links.get = function() {
  var links = this.find({ index: { $exists: true }, parent: { $exists: false } }, { sort: { index: 1 } }).fetch();
  return _.filter(links, function(link) {
    if (link.permission && !Roles.userHasPermission(Meteor.userId(), link.permission)) {
      return false;
    }
    return true;
  });
};

orion.links.getLink = function(identifier) {
  return this.findOne({ identifier: identifier });
};

orion.links.helpers({
  childs: function() {
    var links = orion.links.find({ index: { $exists: true }, parent: this.identifier }, { sort: { index: 1 } }).fetch();
    return _.filter(links, function(link) {
      if (link.permission && !Roles.userHasPermission(Meteor.userId(), link.permission)) {
        return false;
      }
      return true;
    });
  }
});

Template.registerHelper('adminLinks', function() {
  return orion.links.get();
});

Template.registerHelper('getAdminLink', function(identifier) {
  return orion.links.getLink(identifier);
});
