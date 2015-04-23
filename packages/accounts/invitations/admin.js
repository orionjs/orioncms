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