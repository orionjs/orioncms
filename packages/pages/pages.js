orion.pages = {
  templates: {},
  collection: new Meteor.Collection('pages'),
};

Roles.registerAction('pages.index', true);
Roles.registerAction('pages.insert', true);
Roles.registerAction('pages.update', true);
Roles.registerAction('pages.remove', true);

orion.pages.collection.attachRoles('pages');

orion.pages.collection.helpers({
  path: function () {
    return Router.path('pages', {url: this.url});
  }
});

orion.pages._schema = {
  title: {
    type: String,
    label: orion.helpers.getTranslation('pages.schema.title')
  },
  url: {
    type: String,
    regEx: /^[a-z0-9A-Z_-]+$/,
    unique: true,
    label: orion.helpers.getTranslation('pages.schema.url')
  },
  templateName: {
    type: String,
    allowedValues: function() {
      return _.keys(orion.pages.templates);
    },
    autoform: {
      noselect: true,
      options: function() {
        var options = [];
        _.each(orion.pages.templates, function(val, key) {
          options.push({ label: val.name, value: key });
        })
        return options;
      }
    }
  },
  createdAt: orion.attribute('createdAt'),
  updatedAt: orion.attribute('updatedAt'),
  createdBy: orion.attribute('createdBy')
};

/**
 * Create a new template
 */
orion.pages.addTemplate = function (options, schema) {
  if (!options.template) {
    throw new Meteor.Error('orion', 'Template is required');
  }

  var newTemplate = _.extend({
    name: options.template,
    description: 'No description'
  }, options)

  orion.pages._schema[newTemplate.template] = {
    type: new SimpleSchema(schema),
    optional: true
  };

  orion.pages.collection.attachSchema(new SimpleSchema(orion.pages._schema))

  orion.pages.templates[newTemplate.template] = newTemplate;

  return newTemplate;
};

var Tabular = null;

if (Package['nicolaslopezj:tabular-materialize']) {
  Tabular = Package['nicolaslopezj:tabular-materialize'].Tabular;
}

if (Package['aldeed:tabular']) {
  Tabular = Package['aldeed:tabular'].Tabular;
}

if (!Tabular) {
  throw new Meteor.Error('orion', 'You must install tabular to use this package');
}

orion.pages.tabular = new Tabular.Table({
  name: 'PagesIndex',
  collection: orion.pages.collection,
  columns: [
    { data: 'title', title: i18n('pages.schema.title') },
    { data: 'url', title: i18n('pages.schema.url'), render: function(val, type, doc) { return '<a href="' + Router.path('pages', doc) + '">' + Router.path('pages', doc) + '</a>'; } }
  ]
});

/**
 * Register page routes on meteor startup
 */
Meteor.startup(function(){
  Router.route('/:url', function() {
    var subs = Meteor.subscribe('page', this.params.url);
    this.wait(subs);
    if (subs.ready()) {
      var page = orion.pages.collection.findOne({ url: this.params.url });
      if (page) {
        var template = orion.pages.templates[page.template];
        if (template.layout) {
          this.layout(template.layout);
        }
        this.render(page.template, {data: page});
      } else {
        this.render('notFound');
      }
    }
  }, { name: 'pages' });
});
