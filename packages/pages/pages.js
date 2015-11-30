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
    return RouterLayer.pathFor('page', { url: this.url });
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
  stateSave: true,
  columns: [
    { data: 'title', title: i18n('pages.schema.title') },
    { data: 'url', title: i18n('pages.schema.url'), render: function(val, type, doc) { return '<a href="' + RouterLayer.pathFor('page', doc) + '">' + RouterLayer.pathFor('page', doc) + '</a>'; } }
  ]
});

/**
 * Wait the initialization of flow router
 */
 if (RouterLayer.router == 'flow-router') {
   RouterLayer.flowRouter.wait();
 }

/**
 * Register page routes on meteor startup
 */
Meteor.startup(function(){
  RouterLayer.route('/:url', {
    name: 'page',
    template: 'orionPages_mainTemplate'
  });

  if (RouterLayer.router == 'flow-router') {
    RouterLayer.flowRouter.initialize();
  }
});
