/**
 * invite users
 */
ReactiveTemplates.request('accounts.invite');

Router.route('/admin/accounts/invite', function () {
  this.layout(ReactiveTemplates.get('layout'));
  this.render(ReactiveTemplates.get('accounts.invite'));
}, { name: 'accounts.invite' });
orion.accounts.addProtectedRoute('accounts.invite');

if (Meteor.isClient) {
  ReactiveTemplates.onRendered('accounts.invite', function() {
    Session.set('accounts.invite.invitationId', null);
  });
  ReactiveTemplates.helpers('accounts.invite', {
    roles: function() {
      return _.keys(Roles._roles);
    },
    invitationId: function() {
      return Session.get('accounts.invite.invitationId');
    }
  });
  ReactiveTemplates.events('accounts.invite', {
    'submit form.invite': function (event, template) {
      var roles = [];
      template.$('input[role]').each(function(index, val) {
         var role = $(this).attr('role');
         if ($(this).is(':checked')) {
          roles.push(role);
         }
      });

      var email = template.$('input[type="email"]').val();

      Meteor.call('createInvitation', { roles: roles, email: email }, function (error, result) {
        if (error) {
          alert(error.reason);
          console.log(error);
        } else {
          Session.set('accounts.invite.invitationId', result);
        }
      });

      return false;
    },
    'click .btn-invite-another': function() {
      Session.set('accounts.invite.invitationId', null);
    }
  });
}



/**
 * Register with invitation
 */
ReactiveTemplates.request('registerWithInvitation');

Router.route('/register/invitation/:_id', function () {
  this.render(ReactiveTemplates.get('registerWithInvitation'));
}, { name: 'registerWithInvitation' });


if (Meteor.isClient) {

  ReactiveTemplates.onRendered('registerWithInvitation', function() {
    if (Meteor.userId()) {
      Router.go('admin');
    }
    this.subscribe('invitation', Router.current().params._id);
    Session.set('registerWithInvitationError', null);
  })

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
        Session.set('registerWithInvitationError', 'The email is not valid');
        return;
      }

      if (password != passwordConfirm) {
        Session.set('registerWithInvitationError', 'Passwords must match');
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
          })
        }
      });
    }
  });
}





