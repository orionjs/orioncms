orion.links = {};
orion.links._collection = new Meteor.Collection(null);
orion.links._collection.attachSchema(new SimpleSchema({
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
    self._collection.upsert({ identifier: options.identifier }, { $set: options });
  });
}

orion.links.get = function() {
  var links = this._collection.find({ index: { $exists: true }, parent: { $exists: false } }, { sort: { index: 1 } }).fetch();
  return links;
}

orion.links.getLink = function(identifier) {
  return this._collection.findOne({ identifier: identifier });
}

orion.links._collection.helpers({
  childs: function() {
    return orion.links._collection.find({ index: { $exists: true }, parent: this.identifier }, { sort: { index: 1 } }).fetch()
  }
});

Template.registerHelper('adminLinks', function() {
  return orion.links.get();
})

Template.registerHelper('getAdminLink', function(identifier) {
  return orion.links.getLink(identifier);
})


//**
//Hasta aca llegaaaaa
/**
 * Handle sections
Options.init('sections', {});

orion.addSection = function(name, options) {
  check(options, Match.ObjectIncluding({
    index: Match.Optional(Number)
  }));

  var currentSections;
  Tracker.nonreactive(function () {
    currentSections = Options.get('sections');
  });

  currentSections[name] = options;
  Options.set('sections', currentSections);
}

/**
 * Handle links. To add tabs to the sidebar
Options.init('links', []);

orion.addLink = function(options) {
  check(options, Match.ObjectIncluding({
    section: String,
    title: Match.OneOf(String, Function),
    routeName: String,
    activeRouteRegex: Match.Optional(String),
    permission: Match.Optional(String),
  }));

  var currentLinks;

  Tracker.nonreactive(function () {
    if (!_.has(Options.get('sections'), options.section)) {
      throw new Meteor.Error('section-not-found', 'The specified section for the admin link was not found');
    }

    currentLinks = Options.get('links');
    var currentLink = _.findWhere(currentLinks, { routeName: options.routeName });
    if (currentLink) {
      currentLinks = _.without(currentLinks, currentLink);
    }
  });

  currentLinks.push(options);
  Options.set('links', currentLinks);
};

/**
 * Set the helpers to the sidebar template for links
Template.registerHelper('adminLinks', function(section) {
  var links = Options.get('links');
  if (section) {
    links = _.where(links, { section: section });
  }
  _.each(links, function(value, key, list){
    if (value.permission) {
      if (!Roles.userHasPermission(Meteor.userId(), value.permission)) {
        delete list[key];
      }
    }
  });
  return links;
});

/**
* Set the helpers to the sidebar template for sections.
* This effectively makes admin sidebar dynamic. Now you can pass any section.
Template.registerHelper('adminSections', function() {
  var links = Options.get('links');
    sections = _(links).chain().flatten().pluck('section').unique().value().sort();
  return sections;
});
*/
