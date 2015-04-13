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
});

/**
 * Create the template helpers for a dictionary
 */

if (Meteor.isClient) {
  orion.templates.setHelpers('dictionaryUpdate', {
    getDoc: function() {
      return orion.dictionary.findOne();
    }
  })
}

