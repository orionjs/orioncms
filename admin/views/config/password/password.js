Template.adminConfigPassword.helpers(AccountsTemplates.atFormHelpers);
Template.adminConfigPassword.helpers(AccountsTemplates.atTitleHelpers);
Template.adminConfigPassword.helpers(AccountsTemplates.atPwdFormHelpers);
Template.adminConfigPassword.events(AccountsTemplates.atPwdFormEvents);
Template.adminConfigPassword.helpers(AccountsTemplates.atPwdFormBtnHelpers);

Template.adminConfigPassword.helpers({
	getDoc: function() {
		return orion.config.collection.findOne();
	},
	allCategories: function() {
		return _.keys(orion.config.categories);
	},
	isActiveCategory: function() {
		return 'label-default';
	}
});

Template.adminConfigPasswordInput.rendered = AccountsTemplates.atInputRendered;
Template.adminConfigPasswordInput.helpers(AccountsTemplates.atInputHelpers);
Template.adminConfigPasswordInput.events(AccountsTemplates.atInputEvents);
Template.adminConfigPasswordInput.helpers(AccountsTemplates.atInputHelpers);