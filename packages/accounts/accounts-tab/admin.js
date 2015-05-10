/**
 * Display account settings
 */
ReactiveTemplates.request('accounts.index');
ReactiveTemplates.request('accounts.update.roles');

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
orion.addLink({
  section: 'bottom',
  title: mf('accounts', 'Accounts'),
  routeName: 'accounts.index',
  activeRouteRegex: 'accounts',
  permission: 'accounts.index'
});

/**
 * Edit the roles of the user
 */
Router.route('/admin/accounts/:_id/update/roles', function () {
  this.layout(ReactiveTemplates.get('layout'));
  this.render(ReactiveTemplates.get('accounts.update.roles'));
}, { name: 'accounts.update.roles' });
orion.accounts.addProtectedRoute('accounts.update.roles');

orion.accounts.addAdminUsersButton({
  title: mf('edit_roles'),
  route: 'accounts.update.roles',
  shouldShow: function() {
    return Roles.userHasPermission(Meteor.userId(), 'accounts.update.roles');
  }
});
