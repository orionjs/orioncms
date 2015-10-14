/**
 * Register the account index action
 */
Roles.registerAction('accounts.index', true);

/**
 * Can the user update user users roles?
 */
Roles.registerAction('accounts.update.roles', true);
Roles.registerAction('accounts.update.password', true);
Roles.registerAction('accounts.update.emails', true);
Roles.registerAction('accounts.update.profile', true);
Roles.registerAction('accounts.remove', true);

/**
 * Register the index filter for the accounts.list
 */
Roles.registerHelper('accounts.indexFilter', {});

/**
 * To set the actions for the admin
 */
orion.accounts._adminUsersButtons = [];

/**
 * Add buttons to the list of users in the admin
 */
orion.accounts.addAdminUsersButton = function(button) {
  Tracker.nonreactive(function () {
    var current = _.findWhere(orion.accounts._adminUsersButtons, {
      route: button.route,
      meteorMethod: button.meteorMethod,
    });
    if (current) {
      orion.accounts._adminUsersButtons = _.without(orion.accounts._adminUsersButtons, current);
    }
  });

  check(button, {
    title: String,
    route: Match.Optional(String),
    meteorMethod: Match.Optional(String),
    shouldShow: Match.Optional(Function),
    onClick: Match.Optional(Function)
  });

  orion.accounts._adminUsersButtons.push(button);
};
