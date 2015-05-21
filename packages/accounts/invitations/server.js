Meteor.publish('invitation', function (invitationId) {
  check(invitationId, String);
  return orion.accounts.invitations.find(invitationId);
});

Accounts.onCreateUser(function(options, user) {
  // console.log(options,user);
  // Accounts.sendEnrollmentEmail();
  if (options.profile)
    user.profile = options.profile;
  return user;

})

Meteor.methods({
  createInvitation: function (options) {
    check(options, {
      roles: Array,
      email: Match.Optional(String),
      createUser: Boolean
    });
    var invitationId = orion.accounts.invitations.insert(options);

    if (Options.get('sendAccountInvitationToEmail') && Options.get('accountInvitationEmailTemplate') && !options.createUser) {
      // Send invitation by email
    }

    if(options.createUser){
      Accounts.createUser({username: options.email, email:options.email});
    }

    return {invitationId:invitationId, email:options.email, createUser:options.createUser};
  },


  registerWithInvitation: function(options) {
    check(options, {
      email: String,
      password: String,
      name: String,
      invitationId: String
    });

    var invitation = orion.accounts.invitations.findOne(options.invitationId);

    if (!options.invitationId) {
      throw new Meteor.Error('invalid-invitation', 'The invitation code is invalid');
    }

    if (invitation.email && invitation.email != options.email) {
      throw new Meteor.Error('invalid-email', 'The specified email is invalid');
    }

    var userId = Accounts.createUser({ email: options.email, password: options.password });
    Meteor.users.update(userId, { $set: { profile: { name: options.name } } });
    Roles.setUserRoles(userId, invitation.roles);

    orion.accounts.invitations.remove(options.invitationId);

    return userId;
  },
});
