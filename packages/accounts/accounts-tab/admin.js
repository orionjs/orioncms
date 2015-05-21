/**
 * Display account settings
 */
ReactiveTemplates.request('accounts.index');
ReactiveTemplates.request('accounts.update.roles');
ReactiveTemplates.request('accounts.update.edit');

/**
 * Register the route
 */
Router.route('/admin/accounts', function () {
  this.layout(ReactiveTemplates.get('layout'));
  this.render(ReactiveTemplates.get('accounts.index'));
}, { name: 'accounts.index' });
orion.accounts.addProtectedRoute('accounts.index');

/**
 * Register the link
 */
orion.addLink({
  section: 'bottom',
  title: 'Accounts',
  routeName: 'accounts.index',
  activeRouteRegex: 'accounts',
  permission: 'accounts.index'
});

/**
 * Edit the roles of the user
 */
Router.route('/admin/accounts/:_id/update/roles', function () {
  this.layout(ReactiveTemplates.get('layout'));
  this.render(ReactiveTemplates.get('accounts.update.roles'));
}, { name: 'accounts.update.roles' });
orion.accounts.addProtectedRoute('accounts.update.roles');

orion.accounts.addAdminUsersButton({
  title: 'Edit Roles',
  route: 'accounts.update.roles',
  shouldShow: function() {
    return Roles.userHasPermission(Meteor.userId(), 'accounts.update.roles');
  }
});

/**
 * Edit user
 */
Router.route('/admin/accounts/:_id/update', function () {
  this.layout(ReactiveTemplates.get('layout'));
  this.render(ReactiveTemplates.get('accounts.update.edit'));
}, { name: 'accounts.update.edit' });
orion.accounts.addProtectedRoute('accounts.update.edit');

orion.accounts.addAdminUsersButton({
  title: 'Edit',
  route: 'accounts.update.edit',
  shouldShow: function() {
    return Roles.userHasPermission(Meteor.userId(), 'accounts.update.roles');
  }
});



SchemaUser = new SimpleSchema({
    username: {
        type: String,
        regEx: /^[a-z0-9A-Z_]{3,15}$/
    },
    emails: {
        type: [Object],
        // this must be optional if you also use other login services like facebook,
        // but if you use only accounts-password, then it can be required
        optional: true
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean
    },
    createdAt: {
        type: Date
    },
    profile: {
        type: orion.accounts.profileSchema,
        optional: true
    },
    services: {
        type: Object,
        optional: true,
        blackbox: true
    },

});

Meteor.users.attachSchema(SchemaUser);
