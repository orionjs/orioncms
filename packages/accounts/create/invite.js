/**
 * Can the user update user users roles?
 */
Roles.registerAction('accounts.showCreate', true);
Roles.registerAction('accounts.create', true);
Roles.registerHelper('accounts.allowedRoles', function() {
  return Roles.availableRoles();
});
Roles.registerHelper('accounts.deniedRoles', []);
