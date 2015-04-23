/**
 * Register the account index action
 */
Roles.registerAction('accounts.index', true);

/**
 * Can the user update user users roles?
 */
Roles.registerAction('accounts.update.roles', true);

/**
 * Can the user update user users roles?
 */
Roles.registerAction('accounts.create', true);

/**
 * To set the actions for the admin
 */
orion.accounts._adminUsersButtons = [];

/**
 * Add buttons to the list of users in the admin
 */
orion.accounts.addAdminUsersButton = function(button) {
  check(button, {
    title: String,
    route: Match.Optional(String),
    meteorMethod: Match.Optional(String),
    shouldShow: Match.Optional(Function)
  });

  orion.accounts._adminUsersButtons.push(button);
}