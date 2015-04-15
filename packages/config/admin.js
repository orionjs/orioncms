/**
 * Init the template name variable
 */
ReactiveTemplates.request('configUpdate');

/**
 * Register the route
 */
Router.route('/admin/config', function () {
  this.layout(ReactiveTemplates.get('layout'));
  this.render(ReactiveTemplates.get('configUpdate'));
}, { name: 'config.update' });

/**
 * Ensure user is logged in
 */
orion.accounts.addProtectedRoute('config.update');

/**
 * Register the link
 */
orion.addLink({
  section: 'bottom',
  title: 'App Configuration',
  routeName: 'config.update',
  activeRouteRegex: 'config',
  permission: 'config.update'
});

/**
 * Create the template helpers for a dictionary
 */
if (Meteor.isClient) {

  ReactiveTemplates.onRendered('configUpdate', function() {
    var categories = _.uniq(_.pluck(orion.config.collection.simpleSchema()._schema, 'category'));
    var defaultCategory = categories && categories[0]
    Session.set('configUpdateCurrentCategory', defaultCategory);
  })

  ReactiveTemplates.events('configUpdate', {
    'click [data-category]': function(event) {
      var newCategory = $(event.currentTarget).attr('data-category');
      Session.set('configUpdateCurrentCategory', newCategory);
    }
  })

  ReactiveTemplates.helpers('configUpdate', {
    getDoc: function() {
      return orion.config.collection.findOne();
    },
    getFields: function() {
      var currentCategory = Session.get('configUpdateCurrentCategory');
      return _.pluck(_.where(orion.config.collection.simpleSchema()._schema, { category: currentCategory }), 'name')
    },
    getCategories: function() {
      return _.uniq(_.pluck(orion.config.collection.simpleSchema()._schema, 'category'));
    }
  })
}