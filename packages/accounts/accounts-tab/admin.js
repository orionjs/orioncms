/**
 * Display account settings
 */
ReactiveTemplates.request('accounts.index');
ReactiveTemplates.request('accounts.update');

/**
 * Register the route
 */
Router.route('/admin/accounts', function () {
  this.layout(ReactiveTemplates.get('layout'));
  this.render(ReactiveTemplates.get('accounts.index'));
}, { name: 'accounts.index' });
orion.accounts.addProtectedRoute('accounts.index');

/**
 * Register the link
 */
if (Meteor.isClient) {
  Tracker.autorun(function () {
    orion.addLink({
      section: 'bottom',
      title: i18n('accounts.index.title'),
      routeName: 'accounts.index',
      activeRouteRegex: 'accounts',
      permission: 'accounts.index'
    });
  });
}

/**
 * Edit user
 */
Router.route('/admin/accounts/:_id/update', function () {
  this.layout(ReactiveTemplates.get('layout'));
  this.render(ReactiveTemplates.get('accounts.update'));
}, { name: 'accounts.update' });
orion.accounts.addProtectedRoute('accounts.update');

if (Meteor.isClient) {
  Tracker.autorun(function () {
    orion.accounts.addAdminUsersButton({
      title: i18n('accounts.index.actions.edit'),
      route: 'accounts.update',
      shouldShow: function() {
        return Roles.userHasPermission(Meteor.userId(), 'accounts.update.roles');
      }
    });
  });
} 