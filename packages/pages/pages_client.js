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
      Router.go('adminPagesIndex')
    } else {
      Session.set('adminPagesCreate_choosenTemplate', null);
    }
  },
  'click .submit-btn': function () {
    $("#orionPagesCreateForm").submit();
  }
});

AutoForm.hooks({
  orionPagesCreateForm: {
    before: {
      insert: function(doc) {
        var name = Session.get('adminPagesCreate_choosenTemplate');
        if (!name) {
          this.result(false);
        } else {
          doc = orion.pages.templates[name].schema.clean(doc, {
            extendAutoValueContext: {
              isInsert: true,
              userId: Meteor.userId()
            }
          });
          this.result(doc);
        }
      }
    },
    onSuccess: function() {
      Router.go('pages.index');
    }
  }
});

/**
 * Update route
 */
AutoForm.hooks({
  orionPagesUpdateForm: {
    onSuccess: function() {
      Router.go('pages.index');
    }
  }
});

ReactiveTemplates.helpers('pages.update', {
  getSchema: function () {
    return this && orion.pages.templates[this.template] && orion.pages.templates[this.template].schema;
  }
});

ReactiveTemplates.events('pages.update', {
  'click .save-btn': function () {
    $("#orionPagesUpdateForm").submit();
  }
});

/**
 * Delete route
 */
ReactiveTemplates.helpers('pages.delete', {
  onSuccess: function () {
    return function (result) { 
      Router.go('pages.index'); 
    };
  }
});

ReactiveTemplates.events('pages.delete', {
  'click .confirm-delete': function() {
    orion.pages.collection.remove(this._id, function() {
      Router.go('pages.index');
    });
  }
});

