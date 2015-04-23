/**
 * Can the user update user users roles?
 */
Roles.registerAction('accounts.invite', true);
Options.init('sendAccountInvitationToEmail', false);
Options.init('accountInvitationEmailTemplate');

/**
 * Invitations object
 */
orion.accounts.invitations = new Meteor.Collection('invitations');

/**
 * Invitation permissions
 */
orion.accounts.invitations.allow({
  'insert': function(userId, doc) {
    return Roles.allow(this.userId, 'accounts.invite')
  }
});
orion.accounts.invitations.deny({
  'insert': function(userId, doc) {
    return Roles.deny(this.userId, 'accounts.invite')
  }
});

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





