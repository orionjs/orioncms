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
    if (!!options.name) {
      newUser.profile = { name: options.name };
    }

    var userId = Accounts.createUser(newUser);

    Roles.setUserRoles(userId, options.roles);

    return userId;
  },
});
