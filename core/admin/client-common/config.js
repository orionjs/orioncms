/**
 * adminConfigUpdate
 */
orion.admin.configUpdateEvents = {
	'focus [data-type=secret]': function (event) {
		$(event.target).attr('type', 'text');
	},
	'blur [data-type=secret]': function(event) {
		$(event.target).attr('type', 'password');
	}
};

orion.admin.configUpdateHelpers = {
	getDoc: function() {
		return orion.config.collection.findOne();
	},
	allCategories: function() {
		return _.keys(orion.config.categories);
	},
	isActiveCategory: function() {
		return this == Router.current().data().configCategory ? 'label-primary' : 'label-default';
	}
};

/**
 * adminConfigPassword
 */
orion.admin.configPasswordEvents = AccountsTemplates.atPwdFormEvents;

orion.admin.configPasswordHelpers = _.extend({
	getDoc: function() {
		return orion.config.collection.findOne();
	},
	allCategories: function() {
		return _.keys(orion.config.categories);
	},
	isActiveCategory: function() {
		return 'label-default';
	}
}, AccountsTemplates.atFormHelpers, AccountsTemplates.atTitleHelpers, AccountsTemplates.atPwdFormHelpers, AccountsTemplates.atPwdFormBtnHelpers);

/**
 * adminConfigPasswordInput
 */
orion.admin.configPasswordInputEvents = AccountsTemplates.atInputEvents;
orion.admin.configPasswordInputHelpers = AccountsTemplates.atInputHelpers;
orion.admin.configPasswordInputRendered = AccountsTemplates.atInputRendered;