Meteor.publish('adminAccountsList', function () {
  if (!Roles.userHasPermission(this.userId, 'accounts.index')) {
    return [];
  }
  return [
    Meteor.users.find({}, { fields: { services: 0 } }),
    Roles._collection.find()
  ];
});

Meteor.publish('adminAccountsUpdateRoles', function (userId) {
  check(userId, String);
  if (!Roles.userHasPermission(this.userId, 'accounts.update.roles')) {
    return [];
  }
  return [
    Meteor.users.find(userId), // , { fields: { services: 0 } }),
    Roles._collection.find({ userId: userId })
  ];
});

Meteor.methods({
  updateRoles: function (userId, roles) {
    check(userId, String);
    check(roles, Array);
    if (!Roles.userHasPermission(this.userId, 'accounts.update.roles')) {
      throw new Meteor.Error('unauthorized', 'You have no permissions to change user roles');
    }
    Roles.setUserRoles(userId, roles);
  },

  updatePassword: function(options) {
    check(options.password1, String);
    check(options.password2, String);
    check(options.password2, options.password1);

    // Changes password on current user, user is logged out afterwards (true by default)
    // Accounts.setPassword(this.userId, options.password1, {logout: true});
  }
});
