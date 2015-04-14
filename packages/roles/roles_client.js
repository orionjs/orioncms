/**
 * Allow from the client
 */
Template.registerHelper('userAllow', function(action) {
  return Roles.allow(Meteor.userId(), action);
});

/**
 * Deny from the client
 */
Template.registerHelper('userDeny', function(action) {
  return Roles.deny(Meteor.userId(), action);
});

/**
 * Has permission from the client
 */
Template.registerHelper('userHasPermission', function(action) {
  return Roles.userHasPermission(Meteor.userId(), action);
});

/**
 * Roles helpers from the client
 */
Template.registerHelper('userHelper', function(helper) {
  return Roles.helper(Meteor.userId(), helper);
});