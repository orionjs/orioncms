/**
 * invite users
 */
ReactiveTemplates.request('accounts.create');

Router.route('/admin/accounts/create', function () {
  this.layout(ReactiveTemplates.get('layout'));
  this.render(ReactiveTemplates.get('accounts.create'));
}, { name: 'accounts.create' });
orion.accounts.addProtectedRoute('accounts.create');

if (Meteor.isClient) {
  ReactiveTemplates.onRendered('accounts.create', function() {
    Session.set('accounts.create.invitationId', null);
    Session.set('accounts.create.method', 'invitation');
  });
  ReactiveTemplates.helpers('accounts.create', {
    roles: function() {
      return _.keys(Roles._roles);
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

      if (method == 'invitation') {
        orion.accounts.invitations.insert({ roles: roles, email: email }, function(error, result) {
          if (error) {
            alert(error.reason);
            console.log(error);
          } else {
            Session.set('accounts.create.invitationId', result);
          }
        });
      } else if (method == 'now') {
        var name = template.$('input[name="name"]').val();
        var password = template.$('input[name="password"]').val();
        var confirm = template.$('input[name="confirm"]').val();
        if (password != confirm) {
          alert(i18n('global.passwordNotMatch'));
          return false;
        }
        var options = {
          email: email,
          password: password,
          name: name,
          roles: roles
        };
        Meteor.call('accountsCreateUser', options, function(error, result) {
          if (error) {
            alert(error.reason);
            console.log(error);
          } else {
            Router.go('accounts.index');
          }
        });
      }
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

Router.route('/register/invitation/:_id', function () {
  this.layout(ReactiveTemplates.get('outAdminLayout'));
  this.render(ReactiveTemplates.get('registerWithInvitation'));
}, { name: 'registerWithInvitation' });


if (Meteor.isClient) {

  ReactiveTemplates.onRendered('registerWithInvitation', function() {
    if (Meteor.userId()) {
      Router.go('admin');
    }
    this.subscribe('invitation', Router.current().params._id);
    Session.set('registerWithInvitationError', null);
  });

  ReactiveTemplates.helpers('registerWithInvitation', {
    invitation: function() {
      return orion.accounts.invitations.findOne(Router.current().params._id);
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
              Router.go('admin');
            }
          });
        }
      });
    }
  });
}
