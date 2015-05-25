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
    check(options._id, String);
    check(options.password1, String);
    check(options.password2, String);
    check(options.password2, options.password1);
    Accounts.setPassword(options._id, options.password1, {logout: true});
  },

  updateUser: function(user) {
    Meteor.users.update({_id: user._id}, {$set: user});
  },

  removeUser: function(id){
    check(id, String);
    if (!Roles.userHasPermission(this.userId, 'accounts.update.roles')) {
      throw new Meteor.Error('unauthorized', 'You have no permissions to change user roles');
    }
    Meteor.users.remove({_id: id});
  }

});
