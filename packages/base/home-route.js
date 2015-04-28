/**
 * Set the admin home route
 */
Options.init('adminHomeRoute', 'myAccount.index');

Router.route('/admin', function () {
  Router.go(Options.get('adminHomeRoute'));
}, { name: 'admin' });