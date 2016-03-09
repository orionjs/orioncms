orion.collections.onCreated(function() {
  var self = this;

  /**
   * Request a template for the collection
   */
  ReactiveTemplates.request('collections.' + self.name + '.index', Options.get('collectionsDefaultIndexTemplate'));

  /**
   * Register the index route
   */
  RouterLayer.route('/admin/' + self.routePath, {
    layout: 'layout',
    template: 'collections.' + self.name + '.index',
    name: 'collections.' + self.name + '.index',
    reactiveTemplates: true,
  });
  self.indexPath = function() {
    return RouterLayer.pathFor('collections.' + self.name + '.index');
  };

  /**
   * Ensure user is logged in
   */
  orion.accounts.addProtectedRoute('collections.' + self.name + '.index');

  /**
   * Request a template for the collection create
   */
  ReactiveTemplates.request('collections.' + self.name + '.create', Options.get('collectionsDefaultCreateTemplate'));

  /**
   * Register the create route
   */
  RouterLayer.route('/admin/' + self.routePath + '/create', {
    layout: 'layout',
    template: 'collections.' + self.name + '.create',
    name: 'collections.' + self.name + '.create',
    reactiveTemplates: true,
  });
  self.createPath = function() {
    return RouterLayer.pathFor('collections.' + self.name + '.create');
  };

  /**
   * Ensure user is logged in
   */
  orion.accounts.addProtectedRoute('collections.' + self.name + '.create');

  /**
   * Request a template for the collection update
   */
  ReactiveTemplates.request('collections.' + self.name + '.update', Options.get('collectionsDefaultUpdateTemplate'));

  /**
   * Register the update route
   */
  RouterLayer.route('/admin/' + self.routePath + '/:_id', {
    layout: 'layout',
    template: 'collections.' + self.name + '.update',
    name: 'collections.' + self.name + '.update',
    reactiveTemplates: true,
  });
  self.updatePath = function(item) {
    var options = item;
    if (_.isString(item)) {
      options = { _id: item };
    }

    return RouterLayer.pathFor('collections.' + self.name + '.update', options);
  };

  /**
   * Ensure user is logged in
   */
  orion.accounts.addProtectedRoute('collections.' + self.name + '.update');

  /**
   * Request a template for the collection delete
   */
  ReactiveTemplates.request('collections.' + self.name + '.delete', Options.get('collectionsDefaultDeleteTemplate'));

  /**
   * Register the delete route
   */
  RouterLayer.route('/admin/' + self.routePath + '/:_id/delete', {
    layout: 'layout',
    template: 'collections.' + self.name + '.delete',
    name: 'collections.' + self.name + '.delete',
    reactiveTemplates: true,
  });
  this.deletePath = function(item) {
    var options = item;
    if (_.isString(item)) {
      options = { _id: item };
    }

    return RouterLayer.pathFor('collections.' + self.name + '.delete', options);
  };

  /**
   * Ensure user is logged in
   */
  orion.accounts.addProtectedRoute('collections.' + self.name + '.delete');
});
