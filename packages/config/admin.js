/**
 * Init the template name variable
 */
orion.templates.request('configUpdate');

/**
 * Register the route
 */
Router.route('/admin/config', function () {
  this.layout(orion.templates.get('layout'));
  this.render(orion.templates.get('configUpdate'));
}, { name: 'config.update' });

/**
 * Register the link
 */
orion.addLink({
  section: 'bottom',
  title: 'Config',
  routeName: 'config.update',
  activeRouteRegex: 'config',
});

/**
 * Create the template helpers for a dictionary
 */
if (Meteor.isClient) {
  orion.templates.setHelpers('configUpdate', {
    getDoc: function() {
      return orion.config.collection.findOne();
    }
  })
}