/**
 * Can the user update user users roles?
 */
Roles.registerAction('accounts.showCreate', true);
Roles.registerAction('accounts.create', true);
Options.init('sendAccountInvitationToEmail', false);
Options.init('accountInvitationEmailTemplate');

/**
 * Invitations object
 */
orion.accounts.invitations = new Meteor.Collection('invitations');

/**
 * Invitation permissions
 */
orion.accounts.invitations.attachRoles('accounts.invitations');

/**
 * Invitations Schema
 */
InvitationsSchema = new SimpleSchema({
  roles: {
    type: [String]
  },
  email: {
    type: String,
    optional: true
  },
  createdAt: orion.attribute('createdAt'),
  createdBy: orion.attribute('createdBy'),
});

orion.accounts.invitations.attachSchema(InvitationsSchema);
