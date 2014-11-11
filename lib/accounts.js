AccountsTemplates.configure({
	forbidClientAccountCreation: true,
	enablePasswordChange: true,
	showForgotPasswordLink: false,

});

AccountsTemplates.configureRoute('changePwd', {
	template: 'accountsFormTemplate',
	path: '/admin/change-password',
	layoutTemplate: 'adminLayout',
});