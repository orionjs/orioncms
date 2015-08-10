/**
 * To set the secure routes
 */
Options.init('ensureSignedIn', []);

Tracker.autorun(function () {
  Router.plugin('ensureSignedIn', {
    only: Options.get('ensureSignedIn')
  });
});

orion.accounts.addProtectedRoute = function(routeName) {
  Options.arrayPush('ensureSignedIn', routeName);
};

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
  AccountsTemplates.routes.ensureSignedIn.layoutTemplate = ReactiveTemplates.get('outAdminLayout');
});
