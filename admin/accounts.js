var defaultAccountsOptions = {
    confirmPassword: true,
    enablePasswordChange: true,
    forbidClientAccountCreation: true,
    overrideLoginErrors: true,
    sendVerificationEmail: false,
    homeRoutePath: '/admin'
}

AccountsTemplates.configureRoute('changePwd', {
	template: 'adminConfigPassword',
	path: '/admin/change-password',
	layoutTemplate: 'adminLayout',
});

AccountsTemplates.configureRoute('signIn', {
	template: 'adminAccountsLogin',
	path: '/login',
});

orion.users.accounts = AccountsTemplates;
orion.users.accounts.configure(defaultAccountsOptions);
orion.users.accounts.addField({
    _id: 'name',
    type: 'text',
    displayName: 'Name',
    placeholder: 'Your name',
    required: true,
});

orion.users.configure = function(options) {
    if (options.defaultPermissions) {
        orion.users.permissions.defaultPermissions = options.defaultPermissions;
        delete options.defaultPermissions;
    }
    orion.users.accounts.configure(_.extend(defaultAccountsOptions, options));
}

orion.users.ensureRoutePermissions = function(permissions) {
    return function(ironRouter) {
        ironRouter = this.url ? this : ironRouter;
        permissions = typeof permissions == 'string' ? [permissions] : permissions;
        if (Meteor.userId()) {
            var has = true;
            _.each(permissions, function(permission) {
                if (!Meteor.user().hasPermission(permission)) {
                    has = false;
                    
                }
            });
            if (has) {
                ironRouter.next();
            } else {
                ironRouter.render('adminExtrasNotAllowed');
            }
        } else {
            ironRouter.next();
        }
    }
}
