Meteor.methods({
  accountsCreateUser: function(options) {
    check(options, {
      email: String,
      password: Match.Optional(String),
      name: Match.Optional(String),
      roles: [String]
    });

    if (!Roles.userHasPermission(Meteor.userId(), 'accounts.create')) {
      throw new Meteor.Error('unauthorized', i18n('accounts.update.messages.noPermissions'));
    }

    var newUser = { email: options.email };
    if (options.password) {
      newUser.password = options.password;
    }

    var userId = Accounts.createUser(newUser);

    Meteor.users.update(userId, { $set: { profile: { name: options.name } } });
    Roles.setUserRoles(userId, options.roles);

    return userId;
  },
});
