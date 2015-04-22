/**
 * Display account settings
 */
ReactiveTemplates.request('accounts.index');

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
  title: 'Accounts',
  routeName: 'accounts.index',
  activeRouteRegex: 'accounts.',
});