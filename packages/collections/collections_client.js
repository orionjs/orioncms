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
    index: 30
  }, self.link);
  orion.links.add(linkOptions);

  ReactiveTemplates.helpers('collections.' + self.name + '.index', {
    collection: function() {
      return self;
    }
  });

  ReactiveTemplates.helpers('collections.' + self.name + '.create', {
    collection: function() {
      return self;
    }
  });

  ReactiveTemplates.onCreated('collections.' + self.name + '.update', function() {
    var template = this;
    template.autorun(function() {
      template.subscribe('adminGetOne.' + self.name, RouterLayer.getParam('_id'));
    });
  });

  ReactiveTemplates.helpers('collections.' + self.name + '.update', {
    collection: function() {
      return self;
    },
    item: function() {
      return self.findOne(RouterLayer.getParam('_id'));
    }
  });

  ReactiveTemplates.onCreated('collections.' + self.name + '.delete', function() {
    var template = this;
    template.autorun(function() {
      template.subscribe('adminGetOne.' + self.name, RouterLayer.getParam('_id'));
    });
  });

  ReactiveTemplates.helpers('collections.' + self.name + '.delete', {
    collection: function() {
      return self;
    },
    item: function() {
      return self.findOne(RouterLayer.getParam('_id'));
    }
  });

  ReactiveTemplates.events('collections.' + self.name + '.delete', {
    'click .confirm-delete': function() {
      var objectId = RouterLayer.getParam('_id');
      self.remove(objectId, function(error, result) {
        if (error) {
          console.warn('Error while deleting', objectId, 'in collection', self.name, ':', error);
        }
        // Only go back to index in case the deletion has been properly achieved
        if (result === 1) {
          RouterLayer.go(self.indexPath());
        }
      });
    }
  });
})
