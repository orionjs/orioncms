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
 * Edit the roles of the user
 */
Router.route('/admin/accounts/:_id/update/roles', function () {
  this.layout(ReactiveTemplates.get('layout'));
  this.render(ReactiveTemplates.get('accounts.update.roles'));
}, { name: 'accounts.update.roles' });
orion.accounts.addProtectedRoute('accounts.update.roles');

if (Meteor.isClient) {
  Tracker.autorun(function () {
    orion.accounts.addAdminUsersButton({
      title: i18n('accounts.index.actions.editRoles'),
      route: 'accounts.update.roles',
      shouldShow: function() {
        return Roles.userHasPermission(Meteor.userId(), 'accounts.update.roles');
      }
    });
  });
} 
