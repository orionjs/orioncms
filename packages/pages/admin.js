/**
 * Register the Page admin routes and add protection
 */
ReactiveTemplates.request('pages.index');
Router.route('/admin/pages', function() {
  this.layout(ReactiveTemplates.get('layout'));
  this.render(ReactiveTemplates.get('pages.index'));
}, { name: 'pages.index' });
orion.accounts.addProtectedRoute('pages.index');

ReactiveTemplates.request('pages.create');
Router.route('/admin/create', function() {
  this.layout(ReactiveTemplates.get('layout'));
  this.render(ReactiveTemplates.get('pages.create'));
} , {name: 'pages.create'});
orion.accounts.addProtectedRoute('pages.create');

ReactiveTemplates.request('pages.update');
Router.route('/admin/pages/:_id/edit', function() {
  this.layout(ReactiveTemplates.get('layout'));
  var subs = Meteor.subscribe('pages', this.params._id);
  var item = orion.pages.collection.findOne(this.params._id);
  this.item = item;
  this.render(ReactiveTemplates.get('pages.update'), {
    data: function() {
      return item;
    }
  });
} , {name: 'pages.update'});
orion.accounts.addProtectedRoute('pages.update');

ReactiveTemplates.request('pages.delete');
Router.route('/admin/pages/:_id/delete', function() {
  this.layout(ReactiveTemplates.get('layout'));
  var subs = Meteor.subscribe('pages', this.params._id);
  var item = orion.pages.collection.findOne(this.params._id);
  this.item = item;
  this.render(ReactiveTemplates.get('pages.delete'), {
    data: function() {
      return item;
    }
  });
} , {name: 'pages.delete'});
orion.accounts.addProtectedRoute('pages.delete');


/**
 * Register the Pages link in the admin panel
 */
if (Meteor.isClient) {
  Tracker.autorun(function () {
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
