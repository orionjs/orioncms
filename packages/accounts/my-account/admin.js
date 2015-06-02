/**
 * Display account settings
 */
ReactiveTemplates.request('myAccount.index');
ReactiveTemplates.request('myAccount.password');
ReactiveTemplates.request('myAccount.profile');

/**
 * Register the route
 */
Router.route('/admin/my-account', function () {
  this.layout(ReactiveTemplates.get('layout'));
  this.render(ReactiveTemplates.get('myAccount.index'));
}, { name: 'myAccount.index' });
orion.accounts.addProtectedRoute('myAccount.index');

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
  this.render(ReactiveTemplates.get('myAccount.password'));
}, { name: 'myAccount.password' });
orion.accounts.addProtectedRoute('myAccount.password');

/**
 * To update the profile
 */
Router.route('/admin/my-account/profile', function () {
  this.layout(ReactiveTemplates.get('layout'));
  this.render(ReactiveTemplates.get('myAccount.profile'));
}, { name: 'myAccount.profile' });
orion.accounts.addProtectedRoute('myAccount.profile');

/**
 * Create the template events account settings
 */
if (Meteor.isClient) {
  /**
   * Register the link
   */
  Tracker.autorun(function () {
    orion.addLink({
      section: 'user',
      title: i18n('accounts.myAccount.title'),
      routeName: 'myAccount.index',
      activeRouteRegex: 'myAccount',
    });
  });

  ReactiveTemplates.events('myAccount.index', {
    'click .logout': function() {
      return Meteor.logout();
    }
  });

  ReactiveTemplates.helpers('myAccount.profile', {
    getDoc: function() {
      return Meteor.user();
    },
    getSchema: function() {
      return orion.accounts.profileSchema;
    }
  });
}
