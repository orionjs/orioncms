/**
 * invite users
 */
ReactiveTemplates.request('accounts.create');

RouterLayer.route('/admin/accounts/create', {
  layout: 'layout',
  template: 'accounts.create',
  name: 'accounts.create',
  reactiveTemplates: true
});
orion.accounts.addProtectedRoute('accounts.create');

if (Meteor.isClient) {
  ReactiveTemplates.onRendered('accounts.create', function() {
    Session.set('accounts.create.invitationId', null);
    Session.set('accounts.create.method', 'invitation');
  });
  ReactiveTemplates.helpers('accounts.create', {
    roles: function() {
      var allowed = _.union.apply(this, Roles.helper(Meteor.userId(), 'accounts.allowedRoles'));
      var denied = _.union.apply(this, Roles.helper(Meteor.userId(), 'accounts.deniedRoles'));
      return _.difference(allowed, denied);
    },
    invitationId: function() {
      return Session.get('accounts.create.invitationId');
    },
    email: function() {
      return Session.get('accounts.create.email');
    },
    createWithInvitation: function() {
      return Session.get('accounts.create.method') == 'invitation';
    }
  });
  ReactiveTemplates.events('accounts.create', {
    'submit form.create': function (event, template) {
      var roles = [];
      template.$('input[role]').each(function(index, val) {
         var role = $(this).attr('role');
         if ($(this).is(':checked')) {
          roles.push(role);
         }
      });

      var email = template.$('input[type="email"]').val();
      var method = template.$('input[name="createMethod"]:checked').val();
      var options = {};

      if (method == 'invitation') {
        options = {
          email: email,
          roles: roles
        };
      } else if (method == 'now') {
        var name = template.$('input[name="name"]').val();
        var password = template.$('input[name="password"]').val();
        var confirm = template.$('input[name="confirm"]').val();
        if (password != confirm) {
          alert(i18n('global.passwordNotMatch'));
          return false;
        }
        options = {
          email: email,
          password: password,
          name: name,
          roles: roles
        };
      }

      Meteor.call('accountsCreateUser', options, function(error, result) {
        if (error) {
          alert(error.reason);
          console.log(error);
        } else {
          RouterLayer.go('accounts.index');
        }
      });
      return false;
    },
    'change input[name="createMethod"]': function(event, template) {
      Session.set('accounts.create.method', $(event.currentTarget).val());
    },
    'click .btn-invite-another': function() {
      Session.set('accounts.create.invitationId', null);
    }
  });
}

/**
 * Register with invitation
 */
ReactiveTemplates.request('registerWithInvitation');
RouterLayer.route('/register/invitation/:_id', {
  layout: 'outAdminLayout',
  template: 'registerWithInvitation',
  name: 'registerWithInvitation',
  reactiveTemplates: true
});

if (Meteor.isClient) {

  ReactiveTemplates.onRendered('registerWithInvitation', function() {
    if (Meteor.userId()) {
      RouterLayer.go('admin');
    }
    this.subscribe('invitation', RouterLayer.getParam('_id'));
    Session.set('registerWithInvitationError', null);
  });

  ReactiveTemplates.helpers('registerWithInvitation', {
    invitation: function() {
      return orion.accounts.invitations.findOne(RouterLayer.getParam('_id'));
    },
    error: function() {
      return Session.get('registerWithInvitationError');
    }
  });

  ReactiveTemplates.events('registerWithInvitation', {
    'submit form': function (event, template) {
      event.preventDefault();
      Session.set('registerWithInvitationError', null);

      var email = template.$("[name='email']").val(),
        name = template.$("[name='name']").val(),
        password = template.$("[name='password']").val(),
        passwordConfirm = template.$("[name='password-confirm']").val();

      if (!/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
        Session.set('registerWithInvitationError', i18n('accounts.register.messages.invalidEmail'));
        return;
      }

      if (password != passwordConfirm) {
        Session.set('registerWithInvitationError', i18n('global.passwordNotMatch'));
        return;
      }

      Meteor.call('registerWithInvitation', {
        invitationId: Router.current().params._id,
        email: email,
        password: password,
        name: name
      }, function(error, result) {
        if (error) {
          Session.set('registerWithInvitationError', error.reason);
          console.log(error);
        } else {
          Meteor.loginWithPassword(email, password, function(error) {
            if (error) {
              Session.set('registerWithInvitationError', error.reason);
              console.log(error);
            } else {
              RouterLayer.go('admin');
            }
          });
        }
      });
    }
  });
}
