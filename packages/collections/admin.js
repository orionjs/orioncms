orion.collections.onCreated(function() {
  var self = this;

  /**
   * Request a template for the collection
   */
  orion.templates.request('collectionIndex.' + this._name, orion.options.get('collectionsDefaultIndexTemplate'));

  /**
   * Register the index route
   */
  Router.route('/admin/' + this._name, function () {
    this.layout(orion.templates.get('layout'));
    this.render(orion.templates.get('collectionIndex.' + self._name), {
      data: function() {
        return {
          collection: self,
        }; 
      }
    });
  }, { name: ('collections.' + this._name + '.index') });
  this.indexPath = function() {
    return Router.path('collections.' + this._name + '.index');
  }

  /**
   * Request a template for the collection create
   */
  orion.templates.request('collectionCreate.' + this._name, orion.options.get('collectionsDefaultCreateTemplate'));

  /**
   * Register the create route
   */
  Router.route('/admin/' + this._name + '/create', function () {
    this.layout(orion.templates.get('layout'));
    this.render(orion.templates.get('collectionCreate.' + self._name), {
      data: function() {
        return {
          collection: self,
        }; 
      }
    });
  }, { name: ('collections.' + this._name + '.create') });
  this.createPath = function() {
    Router.path('collections.' + this._name + '.create');
  }

  /**
   * Register the link
   */
  orion.addLink({
    section: 'medium',
    title: this._name,
    routeName: 'collections.' + this._name + '.index',
    activeRouteRegex: 'collections.' + this._name,
  });
})