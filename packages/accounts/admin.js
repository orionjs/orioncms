/**
 * Init the template name variable
 */
orion.templates.request('login');

/**
 * Register the route
 */
Router.route('/login', function () {
  this.render(orion.templates.get('login'));
}, { name: 'login' });

/**
 * To set the secure routes
 */

orion.options.init('ensureSignedIn', []);

Tracker.autorun(function () {
  Router.plugin('ensureSignedIn', {
    only: orion.options.get('ensureSignedIn')
  });
});

orion.accounts.addProtectedRoute = function(routeName) {
  orion.options.arrayPush('ensureSignedIn', routeName);
}

/**
 * Set login template to ensure signed in.
 * First we need to create a route (in accounts templates)
 */
AccountsTemplates.configureRoute('ensureSignedIn', {
  template: 'none'
});

/**
 * Then we can override it
 */
Tracker.autorun(function () {
  AccountsTemplates.routes.ensureSignedIn.template = orion.templates.get('login');
});


/**
 * Display account settings
 */
orion.templates.request('accountSettings');

/**
 * Register the route
 */
Router.route('/admin/my-account', function () {
  this.layout(orion.templates.get('layout'));
  this.render(orion.templates.get('accountSettings'));
}, { name: 'accountSettings' });
orion.accounts.addProtectedRoute('accountSettings');

/**
 * Register the link
 */
orion.addLink({
  section: 'bottom',
  title: 'My Account',
  routeName: 'accountSettings',
  activeRouteRegex: 'accountSettings',
});

/**
 * Create the template events account settings
 */
if (Meteor.isClient) {
  orion.templates.setEvents('accountSettings', {
    'click .logout': function() {
      return Meteor.logout();
    }
  })
}

