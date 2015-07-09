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
ReactiveTemplates.helpers('pages.create', {
  templatesNames: function () {
    return _.keys(orion.pages.templates);
  }
});

AutoForm.hooks({
  orionPagesCreateForm: {
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
  templatesNames: function () {
    return _.keys(orion.pages.templates);
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
