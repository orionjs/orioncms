/**
 * Init the template name variable
 */
ReactiveTemplates.request('login');

Tracker.autorun(function () {
  if (ReactiveTemplates.get('login') && ReactiveTemplates.get('outAdminLayout'))
  AccountsTemplates.configureRoute('signIn', {
    name: 'login',
    path: '/login',
    template: ReactiveTemplates.get('login'),
    layoutTemplate: ReactiveTemplates.get('outAdminLayout')
  });
});
