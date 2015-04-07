/**
 * Default account options
 */
var defaultAccountsOptions = {
    confirmPassword: true,
    enablePasswordChange: true,
    forbidClientAccountCreation: true,
    overrideLoginErrors: true,
    sendVerificationEmail: false,
    homeRoutePath: '/admin'
}

/**
 * Configures the change password route
 */
AccountsTemplates.configureRoute('changePwd', {
	template: 'adminConfigPassword',
	path: '/admin/change-password',
	layoutTemplate: 'adminLayout',
});

/**
 * Configures the sign in route
 */
AccountsTemplates.configureRoute('signIn', {
	template: 'adminAccountsLogin',
	path: '/login',
    name: 'login',
    redirect: function() {
        var url = Router.current().params.query.redirect || '/admin';
        Router.go(url);
    }
});

/**
 * Attatch the AccountsTemplates variable to orion users
 */
orion.users.accounts = AccountsTemplates;

/**
 * Configure account templates
 */
orion.users.accounts.configure(defaultAccountsOptions);

/**
 * Adds the "name" field to the sign up form
 */
orion.users.accounts.addField({
    _id: 'name',
    type: 'text',
    displayName: 'Name',
    placeholder: 'Your name',
    required: true,
});

/**
 * Helper to reconfigure account templates
 */
orion.users.configure = function(options) {
    if (options.defaultPermissions) {
        orion.users.permissions.defaultPermissions = options.defaultPermissions;
        delete options.defaultPermissions;
    }
    orion.users.accounts.configure(_.extend(defaultAccountsOptions, options));
}