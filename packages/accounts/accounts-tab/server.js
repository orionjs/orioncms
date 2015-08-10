Meteor.publish('enrolledUsers', function () {
  if (!Roles.userHasPermission(this.userId, 'accounts.index')) {
    return [];
  }

  var self = this;

  Meteor.users.find({}).map(function(user) {
    self.added("enrolledUsers", user._id, {_id: user._id, enrolled: !_.isEmpty(user.services)});
  });

  this.ready();
});

Meteor.publish('adminAccountsIndexTabular', function (tableName, ids, fields) {
  check(tableName, String);
  check(ids, Array);
  check(fields, Match.Optional(Object));

  if (!Roles.userHasPermission(this.userId, 'accounts.index')) {
    return [];
  }
  result = [
    Meteor.users.find({ _id: { $in: ids } }, { fields: { services: 0 } }),
    Roles._collection.find({ userId: { $in: ids } })
  ];
  return result;
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
      throw new Meteor.Error('unauthorized', i18n('accounts.update.messages.noPermissions'));
    }
    Roles.setUserRoles(userId, roles);
  },
  orionAccountsUpdatePassword: function(modifier, userId) {
    var options = modifier.$set;
    check(options, UsersPasswordSchema);
    Accounts.setPassword(userId, options.password, { logout: true });
  },
  orionAccountsUpdateEmails: function(modifier, userId) {
    if (!Roles.userHasPermission(this.userId, 'accounts.update.emails', userId)) {
      throw new Meteor.Error('unauthorized', i18n('accounts.update.messages.noPermissions'));
    }
    Meteor.users.update(userId, modifier);
  },
  orionAccountsUpdateProfile: function(modifier, userId) {
    if (!Roles.userHasPermission(this.userId, 'accounts.update.profile', userId)) {
      throw new Meteor.Error('unauthorized', i18n('accounts.update.messages.noPermissions'));
    }
    Meteor.users.update(userId, modifier);
  },
  removeUser: function(userId){
    check(userId, String);
    if (!Roles.userHasPermission(this.userId, 'accounts.remove', userId)) {
      throw new Meteor.Error('unauthorized', i18n('accounts.update.messages.noPermissions'));
    }
    Meteor.users.remove({ _id: userId });
  }
});
