/**
 * Init the template name variable
 */
ReactiveTemplates.request('login');

RouterLayer.route('/admin/login', {
  name: 'admin.login',
  layout: 'outAdminLayout',
  template: 'login',
  reactiveTemplates: true
});

if (Meteor.isClient) {
  ReactiveTemplates.onRendered('login', function() {
    this.autorun(function() {
      if (Meteor.userId()) {
        var ref = RouterLayer.getQueryParam('ref') || RouterLayer.pathFor('admin');
        if (ref.indexOf('http') > -1) {
          Session.set('orion_isRedirecting', true);
        }
        window.location.replace(ref);
      }
    });
  });
}
