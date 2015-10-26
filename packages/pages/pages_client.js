Template.registerHelper('pages', function(kw) {
  var options = (kw && kw.hash) || {};
  return orion.pages.collection.find(options);
});

ReactiveTemplates.helpers('pages.index', {
  tabularTable: function () {
    return orion.pages.tabular;
  }
});

/**
 * Create Route
 */
ReactiveTemplates.onRendered('pages.create', function () {
  if (_.keys(orion.pages.templates).length == 1) {
    Session.set('adminPagesCreate_choosenTemplate', _.keys(orion.pages.templates)[0]);
  } else {
    Session.set('adminPagesCreate_choosenTemplate', null);
  }
});

ReactiveTemplates.helpers('pages.create', {
  choosenTemplate: function() {
    var name = Session.get('adminPagesCreate_choosenTemplate');
    return name && orion.pages.templates[name];
  },
  templates: function () {
    return _.values(orion.pages.templates);
  }
});

ReactiveTemplates.events('pages.create', {
  'click .template-choose': function () {
    Session.set('adminPagesCreate_choosenTemplate', this.template);
  },
  'click .cancel-btn': function () {
    if (_.keys(orion.pages.templates).length == 1) {
      Meteor.defer(function() {
        RouterLayer.go('pages.index');
      });
    } else {
      Session.set('adminPagesCreate_choosenTemplate', null);
    }
  },
  'click .submit-btn': function () {
    $('#orionPagesCreateForm').submit();
  }
});

AutoForm.hooks({
  orionPagesCreateForm: {
    before: {
      insert: function(doc) {
        var self = this;
        var name = Session.get('adminPagesCreate_choosenTemplate');
        if (!name) {
          self.result(false);
        } else {
          doc = orion.pages.templates[name].schema.clean(doc, {
            extendAutoValueContext: {
              isInsert: true,
              userId: Meteor.userId()
            }
          });

          Meteor.call('orion_pageWithUrl', doc.url, function(error, result) {
            if (!result) {
              self.result(doc);
            } else {
              orion.pages.templates[name].schema.namedContext('orionPagesCreateForm').addInvalidKeys([{name: 'url', type: 'notUnique'}]);
              self.result(false);
            }
          });
        }
      }
    },
    onSuccess: function() {
      RouterLayer.go('pages.index');
    }
  }
});

/**
 * Update route
 */
AutoForm.hooks({
  orionPagesUpdateForm: {
    before: {
      update: function(doc) {
        var self = this;
        var updatingPage = doc.$set;
        var name = updatingPage.template;
        if (!name) {
          self.result(false);
        } else {
          doc = orion.pages.templates[name].schema.clean(doc, {
            extendAutoValueContext: {
              isUpdate: true,
              userId: Meteor.userId()
            }
          });
          Meteor.call('orion_pageWithUrl', updatingPage.url, function(error, result) {
            if (result && result._id != self.docId) {
              orion.pages.templates[name].schema.namedContext('orionPagesUpdateForm').addInvalidKeys([{name: 'url', type: 'notUnique'}]);
              self.result(false);
            } else {
              self.result(doc);
            }
          });
        }
      }
    },
    onSuccess: function() {
      RouterLayer.go('pages.index');
    }
  }
});

ReactiveTemplates.onCreated('pages.update', function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('pageById', RouterLayer.getParam('_id'));
  });
});

ReactiveTemplates.helpers('pages.update', {
  getSchema: function () {
    return this && orion.pages.templates[this.template] && orion.pages.templates[this.template].schema;
  },
  item: function() {
    return orion.pages.collection.findOne(RouterLayer.getParam('_id'));
  }
});

ReactiveTemplates.events('pages.update', {
  'click .save-btn': function () {
    $('#orionPagesUpdateForm').submit();
  }
});

/**
 * Delete route
 */
ReactiveTemplates.onCreated('pages.delete', function() {
 var self = this;
 self.autorun(function() {
   self.subscribe('pageById', RouterLayer.getParam('_id'));
 });
});

ReactiveTemplates.helpers('pages.delete', {
  onSuccess: function () {
    return function (result) {
      RouterLayer.go('pages.index');
    };
  },
  item: function() {
    return orion.pages.collection.findOne(RouterLayer.getParam('_id'));
  }
});

ReactiveTemplates.events('pages.delete', {
  'click .confirm-delete': function() {
    orion.pages.collection.remove(this._id, function() {
      RouterLayer.go('pages.index');
    });
  }
});

/**
 * Reactive Templates
 */
ReactiveTemplates.request('pages.loading', 'orionPages_defaultLoading');
ReactiveTemplates.request('pages.notFound', 'orionPages_defaultNotFound');

/**
 * Pages main template
 */
Template.orionPages_mainTemplate.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('page', RouterLayer.getParam('url'));
  });
});

Template.orionPages_mainTemplate.helpers({
  page: function() {
    return orion.pages.collection.findOne({ url: RouterLayer.getParam('url') });
  },
  layout: function() {
    var page = orion.pages.collection.findOne({ url: RouterLayer.getParam('url') });
    var template = orion.pages.templates[page.template];
    return template.layout;
  },
  template: function() {
    var page = orion.pages.collection.findOne({ url: RouterLayer.getParam('url') });
    return page.template;
  }
});
