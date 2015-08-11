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
    return RouterLayer.pathFor('pages', { url: this.url });
  }
});

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
  }, options);

  var newSchema = orion.pages.getNewTemplateSchema(schema, newTemplate);
  newTemplate.schema = new SimpleSchema(newSchema);

  orion.pages.templates[newTemplate.template] = newTemplate;

  return newTemplate;
};

orion.pages.getNewTemplateSchema = function (schema, newTemplate) {
  return _.extend({
    title: {
      type: String,
      label: orion.helpers.getTranslation('pages.schema.title')
    },
    url: {
      type: String,
      regEx: /^[a-z0-9A-Z_-]+$/,
      label: orion.helpers.getTranslation('pages.schema.url')
    },
    template: {
      type: String,
      autoform: {
        omit: true
      },
      autoValue: function () {
        return newTemplate.template;
      }
    },
    createdAt: orion.attribute('createdAt'),
    updatedAt: orion.attribute('updatedAt'),
    createdBy: orion.attribute('createdBy')
  }, schema);
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
    { data: 'url', title: i18n('pages.schema.url'), render: function(val, type, doc) { return '<a href="' + RouterLayer.pathFor('pages', doc) + '">' + RouterLayer.pathFor('pages', doc) + '</a>'; } }
  ]
});

/**
 * Register page routes on meteor startup
 */
Meteor.startup(function(){
  if (RouterLayer.router == 'iron-router') {
    RouterLayer.ironRouter.route('/:url', function() {
      var subs = Meteor.subscribe('page', this.params.url);
      if (subs.ready()) {
        var page = orion.pages.collection.findOne({ url: this.params.url });
        if (page) {
          var template = orion.pages.templates[page.template];
          if (template.layout) {
            this.layout(template.layout);
          }
          this.render(page.template, { data: { page: page } });
        } else {
          this.render('notFound');
        }
      } else {
        this.render('');
      }
    }, { name: 'pages' });
  } else if (RouterLayer.router == 'flow-router') {
    RouterLayer.flowRouter.route('/:url', {
      name: 'pages',
      action: function(params) {
        var subs = Meteor.subscribe('page', params.url);
        Tracker.autorun(function() {
          if (subs.ready()) {
            var page = orion.pages.collection.findOne({ url: params.url });
            if (page) {
              var template = orion.pages.templates[page.template];
              if (template.layout) {
                BlazeLayout.render(template.layout, { content: page.template });
              } else {
                BlazeLayout.render(page.template);
              }
              Template[page.template].helpers({
                page: function() {
                  return orion.pages.collection.findOne({ url: RouterLayer.getParam('url') });
                }
              });
            } else {
              BlazeLayout.render('notFound');
            }
          }
        });
      }
    });
    RouterLayer.flowRouter.initialize();
  }
});

if (RouterLayer.router == 'flow-router') {
  RouterLayer.flowRouter.wait();
}
