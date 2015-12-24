orion.collections.onCreated(function() {
  var self = this;

  /**
   * Register the link
   */
  var linkOptions = _.extend({
    identifier: 'collections-' + self.name,
    routeName: 'collections.' + self.name + '.index',
    activeRouteRegex: 'collections.' + self.name,
    permission: 'collections.' + self.name + '.index',
    title: self.name[0].toUpperCase() + self.name.slice(1),
    index: 30,
  }, self.link);
  orion.links.add(linkOptions);

  var getCollection = function() {
    var collection = null;
    try {
      var path = RouterLayer.getPath().split('/')[2];
      collection = orion.collections.list[path];
    } catch (e) {
      console.log('Error getting collection', e);
    }

    return collection;
  };

  ReactiveTemplates.helpers('collections.' + self.name + '.index', {
    collection: function() {
      return getCollection();
    },
  });

  ReactiveTemplates.helpers('collections.' + self.name + '.create', {
    collection: function() {
      return getCollection();
    },
  });

  ReactiveTemplates.onCreated('collections.' + self.name + '.update', function() {
    this.autorun(() => {
      var collection = getCollection();
      if (collection) {
        if (collection.autopublishUpdate && RouterLayer.isActiveRoute('collections.' + collection.name + '.update')) {
          this.subscribe('adminGetOne.' + getCollection().name, RouterLayer.getParam('_id'));
        }
      }
    });
  });

  ReactiveTemplates.helpers('collections.' + self.name + '.update', {
    collection: function() {
      return getCollection();
    },

    item: function() {
      return getCollection() && getCollection().findOne(RouterLayer.getParam('_id'));
    },
  });

  ReactiveTemplates.onCreated('collections.' + self.name + '.delete', function() {
    var template = this;
    template.autorun(function() {
      getCollection() && RouterLayer.isActiveRoute('collections.' + getCollection().name + '.delete') && template.subscribe('adminGetOne.' + getCollection().name, RouterLayer.getParam('_id'));
    });
  });

  ReactiveTemplates.helpers('collections.' + self.name + '.delete', {
    collection: function() {
      return getCollection();
    },

    item: function() {
      return getCollection().findOne(RouterLayer.getParam('_id'));
    },
  });

  ReactiveTemplates.events('collections.' + self.name + '.delete', {
    'click .confirm-delete': function() {
      var objectId = RouterLayer.getParam('_id');
      self.remove(objectId, function(error, result) {
        if (error) {
          console.warn('Error while deleting', objectId, 'in collection', getCollection().name, ':', error);
        }

        // Only go back to index in case the deletion has been properly achieved
        if (result === 1) {
          RouterLayer.go(getCollection().indexPath());
        }
      });
    },
  });
});
