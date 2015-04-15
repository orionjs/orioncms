/**
 * Init the template name variable
 */
ReactiveTemplates.request('login');

/**
 * Register the routes
 */
Router.route('/login', function () {
  this.render(ReactiveTemplates.get('login'));
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
  AccountsTemplates.routes.ensureSignedIn.template = ReactiveTemplates.get('login');
});


/**
 * Display account settings
 */
ReactiveTemplates.request('account.index');
ReactiveTemplates.request('account.password');
ReactiveTemplates.request('account.profile');

/**
 * Register the route
 */
Router.route('/admin/my-account', function () {
  this.layout(ReactiveTemplates.get('layout'));
  this.render(ReactiveTemplates.get('account.index'));
}, { name: 'account.index' });
orion.accounts.addProtectedRoute('account.index');

/**
 * Allow password change
 */
AccountsTemplates.configure({
  enablePasswordChange: true
});

/**
 * Register the route
 */
Router.route('/admin/my-account/change-password', function () {
  this.layout(ReactiveTemplates.get('layout'));
  this.render(ReactiveTemplates.get('account.password'));
}, { name: 'account.password' });
orion.accounts.addProtectedRoute('account.password');

/**
 * To update the profile
 */
Router.route('/admin/my-account/profile', function () {
  this.layout(ReactiveTemplates.get('layout'));
  this.render(ReactiveTemplates.get('account.profile'));
}, { name: 'account.profile' });
orion.accounts.addProtectedRoute('account.profile');

/**
 * Register the link
 */
orion.addLink({
  section: 'bottom',
  title: 'My Account',
  routeName: 'account.index',
  activeRouteRegex: 'account',
});

/**
 * Create the template events account settings
 */
if (Meteor.isClient) {
  ReactiveTemplates.events('account.index', {
    'click .logout': function() {
      return Meteor.logout();
    }
  })

  ReactiveTemplates.helpers('account.profile', {
    getDoc: function() {
      return Meteor.user();
    },
    getSchema: function() {
      return orion.accounts.profileSchema;
    }
  })
}

