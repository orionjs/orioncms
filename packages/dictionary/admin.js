/**
 * Init the template name variable
 */
ReactiveTemplates.request('dictionaryUpdate');

/**
 * Register the route
 */
Router.route('/admin/dictionary', function () {
  this.layout(ReactiveTemplates.get('layout'));
  this.render(ReactiveTemplates.get('dictionaryUpdate'));
}, { name: 'dictionary.update' });

/**
 * Ensure user is logged in
 */
orion.accounts.addProtectedRoute('dictionary.update');

/**
 * Register the link
 */
orion.addLink({
  section: 'top',
  title: 'Dictionary',
  routeName: 'dictionary.update',
  activeRouteRegex: 'dictionary',
  permission: 'dictionary.update',
});

/**
 * Create the template helpers for a dictionary
 */

if (Meteor.isClient) {

  ReactiveTemplates.onRendered('dictionaryUpdate', function() {
    var defaultCategory = orion.dictionary.simpleSchema()._firstLevelSchemaKeys && orion.dictionary.simpleSchema()._firstLevelSchemaKeys[0];
    Session.set('dictionaryUpdateCurrentCategory', defaultCategory);
  })

  ReactiveTemplates.events('dictionaryUpdate', {
    'click [data-category]': function(event) {
      var newCategory = $(event.currentTarget).attr('data-category');
      Session.set('dictionaryUpdateCurrentCategory', newCategory);
    }
  })

  ReactiveTemplates.helpers('dictionaryUpdate', {
    getDoc: function() {
      return orion.dictionary.findOne();
    },
    currentCategory: function() {
      return Session.get('dictionaryUpdateCurrentCategory');
    },
    getCategories: function() {
      return _.union.apply(this, Roles.helper(Meteor.userId(), 'dictionary.getAllowedCategories'))
    }
  })
}
