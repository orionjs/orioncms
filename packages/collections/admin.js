orion.collections.onCreated(function() {
  var self = this;

  /**
   * Request a template for the collection
   */
  ReactiveTemplates.request('collections.' + this.name + '.index', Options.get('collectionsDefaultIndexTemplate'));

  /**
   * Register the index route
   */
  Router.route('/admin/' + this.routePath, function () {
    this.collection = self;
    this.layout(ReactiveTemplates.get('layout'));
    this.render(ReactiveTemplates.get('collections.' + self.name + '.index'), {
      data: function() {
        return {
          collection: self,
        }; 
      }
    });
  }, { name: ('collections.' + this.name + '.index') });
  this.indexPath = function() {
    return Router.path('collections.' + self.name + '.index');
  }

  /**
   * Ensure user is logged in
   */
  orion.accounts.addProtectedRoute('collections.' + this.name + '.index');

  /**
   * Request a template for the collection create
   */
  ReactiveTemplates.request('collections.' + this.name + '.create', Options.get('collectionsDefaultCreateTemplate'));

  /**
   * Register the create route
   */
  Router.route('/admin/' + this.routePath + '/create', function () {
    this.collection = self;
    this.layout(ReactiveTemplates.get('layout'));
    this.render(ReactiveTemplates.get('collections.' + self.name + '.create'), {
      data: function() {
        return {
          collection: self,
        }; 
      }
    });
  }, { name: ('collections.' + this.name + '.create') });
  this.createPath = function() {
    return Router.path('collections.' + self.name + '.create');
  }

  /**
   * Ensure user is logged in
   */
  orion.accounts.addProtectedRoute('collections.' + this.name + '.create');

  /**
   * Request a template for the collection update
   */
  ReactiveTemplates.request('collections.' + this.name + '.update', Options.get('collectionsDefaultUpdateTemplate'));
  
  /**
   * Register the update route
   */
  Router.route('/admin/' + this.routePath + '/:_id', function () {
    this.collection = self;
    this.layout(ReactiveTemplates.get('layout'));
    var subs = Meteor.subscribe('adminGetOne.' + self.name, this.params._id);
    var item = self.findOne(this.params._id);
    this.item = item;
    if (subs.ready()) {
      this.render(ReactiveTemplates.get('collections.' + self.name + '.update'), {
        data: function() {
          return {
            collection: self,
            item: item,
          }; 
        }
      });
    } else {
      this.render('');
    }
  }, { name: ('collections.' + this.name + '.update') });
  this.updatePath = function(item) {
    var options = item;
    if (_.isString(item)) {
      options = { _id: item };
    }
    return Router.path('collections.' + self.name + '.update', options);
  }

  /**
   * Ensure user is logged in
   */
  orion.accounts.addProtectedRoute('collections.' + this.name + '.update');

  /**
   * Request a template for the collection delete
   */
  ReactiveTemplates.request('collections.' + this.name + '.delete', Options.get('collectionsDefaultDeleteTemplate'));
  if (Meteor.isClient) {
    ReactiveTemplates.events('collections.' + self.name + '.delete', {
      'click .confirm-delete': function() {
        self.remove(this.item._id, function() {
          Router.go(self.indexPath());
        });
      }
    })
  }

  /**
   * Register the delete route
   */
  Router.route('/admin/' + this.routePath + '/:_id/delete', function () {
    this.collection = self;
    this.layout(ReactiveTemplates.get('layout'));
    var subs = Meteor.subscribe('adminGetOne.' + self.name, this.params._id);
    var item = self.findOne(this.params._id);
    this.item = item;
    if (subs.ready()) {
      this.render(ReactiveTemplates.get('collections.' + this.name + '.delete'), {
        data: function() {
          return {
            collection: self,
            item: item,
          }; 
        }
      });
    } else {
      this.render('');
    }
  }, { name: ('collections.' + this.name + '.delete') });
  this.deletePath = function(item) {
    var options = item;
    if (_.isString(item)) {
      options = { _id: item };
    }
    return Router.path('collections.' + self.name + '.delete', options);
  }

  /**
   * Ensure user is logged in
   */
  orion.accounts.addProtectedRoute('collections.' + this.name + '.delete');

  if (Meteor.isClient) {
    /**
     * Register the link
     */
    var linkOptions = _.extend({
      routeName: 'collections.' + this.name + '.index',
      activeRouteRegex: 'collections.' + this.name,
      permission: 'collections.' + this.name + '.index',
      title: this.name[0].toUpperCase() + this.name.slice(1),
      section: 'medium'
    }, this.link);
    orion.addLink(linkOptions);
  }
})