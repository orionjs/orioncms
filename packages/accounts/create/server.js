Meteor.publish('invitation', function (invitationId) {
  check(invitationId, String);
  return orion.accounts.invitations.find(invitationId);
});

Meteor.methods({
  registerWithInvitation: function(options) {
    check(options, {
      email: String,
      password: String,
      name: String,
      invitationId: String
    });

    var invitation = orion.accounts.invitations.findOne(options.invitationId);

    if (!options.invitationId) {
      throw new Meteor.Error('invalid-invitation', i18n('accounts.register.messages.invalidInvitationCode'));
    }

    if (invitation.email && invitation.email != options.email) {
      throw new Meteor.Error('invalid-email', i18n('accounts.register.messages.invalidEmail'));
    }

    var userId = Accounts.createUser({ email: options.email, password: options.password });
    Meteor.users.update(userId, { $set: { profile: { name: options.name } } });
    Roles.setUserRoles(userId, invitation.roles);

    orion.accounts.invitations.remove(options.invitationId);

    return userId;
  },
  accountsCreateUser: function(options) {
    check(options, {
      email: String,
      password: String,
      name: String,
      roles: [String]
    });

    if (!Roles.userHasPermission(Meteor.userId(), 'accounts.create')) {
      throw new Meteor.Error('unauthorized', i18n('accounts.update.messages.noPermissions'));
    }

    var userId = Accounts.createUser({ email: options.email, password: options.password });
    Meteor.users.update(userId, { $set: { profile: { name: options.name } } });
    Roles.setUserRoles(userId, options.roles);

    return userId;
  },
});
