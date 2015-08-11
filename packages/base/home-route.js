/**
 * Set the admin home route
 */
Options.init('adminHomeRoute', 'myAccount.index');

if (RouterLayer.router == 'iron-router') {
  RouterLayer.ironRouter.route('/admin', function () {
    this.router.go(Options.get('adminHomeRoute'), {}, { replaceState: true });
  }, { name: 'admin' });
} else {
  RouterLayer.flowRouter.route('/admin', {
    name: 'admin',
    action: function() {
      RouterLayer.go(Options.get('adminHomeRoute'));
    }
  });
}
