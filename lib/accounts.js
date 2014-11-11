AccountsTemplates.configure(cms.accounts.accountsTemplatesConfig);

AccountsTemplates.configureRoute('changePwd', {
	template: 'accountsFormTemplate',
	path: '/admin/change-password',
	layoutTemplate: 'adminLayout',
});