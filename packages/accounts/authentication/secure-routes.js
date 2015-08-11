/**
 * To set the secure routes
 */
Options.init('ensureSignedIn', []);

Tracker.autorun(function () {
  var routes = Options.get('ensureSignedIn');
  if (RouterLayer.router == 'iron-router') {
    RouterLayer.ironRouter.onBeforeAction(function() {
      if (_.contains(routes, RouterLayer.ironRouter.current().route.getName()) && !Meteor.userId()) {
        this.router.go('admin.login', { }, { replaceState: true, query: { ref: window.location.href } });
        return;
      }
      this.next();
    });
  } else if (RouterLayer.router == 'flow-router') {
    RouterLayer.flowRouter.triggers.enter([function(context, redirect) {
      Tracker.autorun(function() {
        if (_.contains(routes, RouterLayer.flowRouter.getRouteName()) && !Meteor.userId()) {
          RouterLayer.go('admin.login');
        }
      });
    }]);
  }
});

orion.accounts.addProtectedRoute = function(routeName) {
  Options.arrayPush('ensureSignedIn', routeName);
};
