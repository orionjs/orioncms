/**
 * Init the template name variable
 */
orion.templates.request('dictionaryUpdate');

/**
 * Register the route
 */
Router.route('/admin/dictionary', function () {
  this.layout(orion.templates.get('layout'));
  this.render(orion.templates.get('dictionaryUpdate'));
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

  orion.templates.setOnRendered('dictionaryUpdate', function() {
    var defaultCategory = orion.dictionary.simpleSchema()._firstLevelSchemaKeys && orion.dictionary.simpleSchema()._firstLevelSchemaKeys[0];
    Session.set('dictionaryUpdateCurrentCategory', defaultCategory);
  })

  orion.templates.setEvents('dictionaryUpdate', {
    'click [data-category]': function(event) {
      var newCategory = $(event.currentTarget).attr('data-category');
      Session.set('dictionaryUpdateCurrentCategory', newCategory);
    }
  })

  orion.templates.setHelpers('dictionaryUpdate', {
    getDoc: function() {
      return orion.dictionary.findOne();
    },
    currentCategory: function() {
      return Session.get('dictionaryUpdateCurrentCategory');
    },
    getCategories: function() {
      return orion.roles.helper(Meteor.userId(), 'dictionary.getAllowedCategories');
    }
  })
}
