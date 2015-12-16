/**
 * Register the Page admin routes and add protection
 */
ReactiveTemplates.request('pages.index');
RouterLayer.route('/admin/pages', {
  layout: 'layout',
  template: 'pages.index',
  name: 'pages.index',
  reactiveTemplates: true,
});
orion.accounts.addProtectedRoute('pages.index');

ReactiveTemplates.request('pages.create');
RouterLayer.route('/admin/pages/create', {
  layout: 'layout',
  template: 'pages.create',
  name: 'pages.create',
  reactiveTemplates: true,
});
orion.accounts.addProtectedRoute('pages.create');

ReactiveTemplates.request('pages.update');
RouterLayer.route('/admin/pages/:_id/edit', {
  layout: 'layout',
  template: 'pages.update',
  name: 'pages.update',
  reactiveTemplates: true,
});
orion.accounts.addProtectedRoute('pages.update');

ReactiveTemplates.request('pages.delete');
RouterLayer.route('/admin/pages/:_id/delete', {
  layout: 'layout',
  template: 'pages.delete',
  name: 'pages.delete',
  reactiveTemplates: true,
});
orion.accounts.addProtectedRoute('pages.delete');

/**
 * Register the Pages link in the admin panel
 */
if (Meteor.isClient) {
  Tracker.autorun(function() {
    orion.links.add({
      index: 40,
      identifier: 'pages-index',
      title: i18n('pages.index.title'),
      routeName: 'pages.index',
      activeRouteRegex: 'pages',
      permission: 'pages.index',
    });
  });
}
