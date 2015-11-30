Meteor.publish('adminAccountsIndexTabular', function (tableName, ids, fields) {
  check(tableName, String);
  check(ids, Array);
  check(fields, Match.Optional(Object));

  if (!Roles.userHasPermission(this.userId, 'accounts.index')) {
    return [];
  }

  var self = this;
  var transform = function(user) {
    user.usedServices = _.keys(user.services);
    delete user.services;
    return user;
  };

  fields.services = 1;
  fields.roles = 1;
  var usersHandle = Meteor.users.find({ _id: { $in: ids } }, { fields: fields }).observe({
    added: function (user) {
      self.added('users', user._id, transform(user));
    },
    changed: function (user) {
      self.changed('users', user._id, transform(user));
    },
    removed: function (user) {
      self.removed('users', user._id);
    }
  });

  self.onStop(function() {
    usersHandle.stop();
  });

  if (Roles._collection) {
    var rolesHandle = Roles._collection.find({ userId: { $in: ids } }).observe({
      added: function (role) {
        self.added('roles', role._id, role);
      },
      changed: function (role) {
        self.changed('roles', role._id, role);
      },
      removed: function (role) {
        self.removed('roles', role._id);
      }
    });

    self.onStop(function() {
      rolesHandle.stop();
    });
  }

  self.ready();
});

Meteor.publish('adminAccountsUpdateRoles', function (userId) {
  check(userId, String);
  if (!Roles.userHasPermission(this.userId, 'accounts.update.roles')) {
    return [];
  }
  if (Roles._collection) {
    return [
      Meteor.users.find(userId, { fields: { services: 0 } }),
      Roles._collection.find({ userId: userId })
    ];
  } else {
    return Meteor.users.find(userId, { fields: { services: 0 } });
  }
});

Meteor.methods({
  updateRoles: function (userId, roles) {
    check(userId, String);
    check(roles, Array);
    if (!Roles.userHasPermission(this.userId, 'accounts.update.roles')) {
      throw new Meteor.Error('unauthorized', i18n('accounts.update.messages.noPermissions'));
    }
    var allowed = _.union.apply(this, Roles.helper(this.userId, 'accounts.allowedRoles'));
    var denied = _.union.apply(this, Roles.helper(this.userId, 'accounts.deniedRoles'));
    var finalRoles = _.difference(allowed, denied);

    if (_.difference(roles, finalRoles).length !== 0) {
      throw new Meteor.Error('unauthorized', i18n('accounts.update.messages.noPermissions'));
    }

    Roles.setUserRoles(userId, roles);
  },
  orionAccountsUpdatePassword: function(modifier, userId) {
    if (!Roles.userHasPermission(this.userId, 'accounts.update.password', userId)) {
      throw new Meteor.Error('unauthorized', i18n('accounts.update.messages.noPermissions'));
    }
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
  },
  adminSendEnrollmentEmail: function(userId) {
    check(userId, String);
    Roles.checkPermission(this.userId, 'accounts.index');
    return Accounts.sendEnrollmentEmail(userId);
  }
});
