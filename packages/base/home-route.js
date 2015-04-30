/**
 * Set the admin home route
 */
Options.init('adminHomeRoute', 'myAccount.index');

Router.route('/admin', function () {
  this.router.go(Options.get('adminHomeRoute'), {}, { replaceState: true });
}, { name: 'admin' });