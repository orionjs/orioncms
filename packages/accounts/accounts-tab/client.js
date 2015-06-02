ReactiveTemplates.onRendered('accounts.index', function() {
  this.subscribe('adminAccountsList');
  this.subscribe('enrolledUsers');
})

ReactiveTemplates.helpers('accounts.index', {
  users: function () {
    return Meteor.users.find({}, { sort: { createdAt: -1 } });
  },
  buttons: function() {
    var self = this;
    return _.filter(orion.accounts._adminUsersButtons, function(value, key, list){
      if (typeof value.shouldShow != 'function') {
        return true;
      }
      return value.shouldShow(self);
    });
  },

  name: function() {
    return this.profile && this.profile.name || "NA";
  },

  enrolled: function() {
    var item = EnrolledUsers.findOne({_id: this._id}),
        value = item && item.enrolled;

    if(value)
      return "YES";

    return "NO";
  }
});

ReactiveTemplates.events('accounts.index', {
  'click .user-btn-action': function (event, template) {
    var button = this;
    var userId = $(event.currentTarget).attr('data-user');
    var user = Meteor.users.findOne(userId);
    if (button.meteorMethod) {
      Meteor.call(button.meteorMethod, user);
    } else if (button.route) {
      Router.go(button.route, user);
    }
  }
});

ReactiveTemplates.onRendered('accounts.update', function() {
  var userId = Router.current().params._id;
  this.subscribe('adminAccountsUpdateRoles', userId);
});

ReactiveTemplates.helpers('accounts.update', {
  user: function() {
    var userId = Router.current().params._id;
    return Meteor.users.findOne(userId);
  },
  collection: function() {
    return Meteor.users;
  },
  emailsSchema: function(){
    return UsersEmailsSchema;
  },
  profileSchema: function() {
    return orion.accounts.profileSchema;
  },
  passwordSchema: function(){
    return UsersPasswordSchema;
  },
  roles: function() {
    return _.keys(Roles._roles);
  },
  hasRole: function(role) {
    var userId = Router.current().params._id;
    return Roles.userHasRole(userId, role);
  }
});

ReactiveTemplates.events('accounts.update', {
  'click #btnDeleteUser': function (event, template) {
    var userId = Router.current().params._id;
    Meteor.call('removeUser', userId, function (error, result) {
      if (error) {
        alert(error.reason)
      } else {
        Router.go('accounts.index');
      }
    });
  },
  'submit form.roles': function (event, template) {
    var userId = Router.current().params._id;
    var roles = [];
    template.$('input[role]').each(function(index, val) {
       var role = $(this).attr('role');
       if ($(this).is(':checked')) {
        roles.push(role);
       }
    });
    Meteor.call('updateRoles', userId, roles, function (error, result) {
      if (error) {
        alert(error.reason)
      }
    });
    return false;
  }
});
