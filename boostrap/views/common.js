/**
 * adminAccountsInvitation
 */
Template.adminAccountsInvitation.events(orion.admin.accountsInvitationEvents);
Template.adminAccountsInvitation.helpers(orion.admin.accountsInvitationHelpers);
Template.adminAccountsInvitation.rendered = orion.admin.accountsInvitationRendered;

/**
 * adminAccountsLogin
 */
Template.adminAccountsLogin.events(orion.admin.accountsLoginEvents);
Template.adminAccountsLogin.helpers(orion.admin.accountsLoginHelpers);

/**
 * adminAccountsSetup
 */
Template.adminAccountsSetup.events(orion.admin.accountsSetupEvents);
Template.adminAccountsSetup.helpers(orion.admin.accountsSetupHelpers);
Template.adminAccountsSetup.rendered = orion.admin.accountsSetupRendered;

/**
 * adminSidebar
 */
Template.adminSidebar.events(orion.admin.sidebarEvents);
Template.adminSidebar.helpers(orion.admin.sidebarHelpers);

/**
 * adminConfigUpdate
 */
Template.adminConfigUpdate.events(orion.admin.configUpdateEvents);
Template.adminConfigUpdate.helpers(orion.admin.configUpdateHelpers);

/**
 * adminConfigPassword
 */
Template.adminConfigPassword.events(orion.admin.configPasswordEvents);
Template.adminConfigPassword.helpers(orion.admin.configPasswordHelpers);

/**
 * adminConfigPasswordInput
 */
Template.adminConfigPasswordInput.events(orion.admin.configPasswordInputEvents);
Template.adminConfigPasswordInput.helpers(orion.admin.configPasswordInputHelpers);
Template.adminConfigPasswordInput.rendered = orion.admin.configPasswordInputRendered;

/**
 * adminDictionaryUpdate
 */
Template.adminDictionaryUpdate.events(orion.admin.languagesEvents);
Template.adminDictionaryUpdate.helpers(orion.admin.dictionaryUpdateHelpers);

/**
 * adminEntitiesCreate
 */
Template.adminEntitiesCreateDefault.helpers(orion.admin.entitiesCreateDefaultHelpers);

/**
 * adminEntitiesDelete
 */
Template.adminEntitiesDelete.helpers(orion.admin.entitiesDeleteHelpers);

/**
 * adminEntitiesIndex
 */
Template.adminEntitiesIndexDefault.events(orion.admin.entitiesIndexDefaultEvents);
Template.adminEntitiesIndexDefault.helpers(orion.admin.entitiesIndexDefaultHelpers);
Template.adminEntitiesIndexDefault.rendered = orion.admin.entitiesIndexDefaultRendered;

/**
 * adminEntitiesUpdate
 */
Template.adminEntitiesUpdateDefault.events(orion.admin.entitiesUpdateDefaultEvents);
Template.adminEntitiesUpdateDefault.helpers(orion.admin.entitiesUpdateDefaultHelpers);

/**
 * adminUsersCreate
 */
Template.adminUsersCreate.events(orion.admin.usersCreateEvents);
Template.adminUsersCreate.helpers(orion.admin.usersCreateHelpers);
Template.adminUsersCreate.rendered = orion.admin.usersCreateRendered;

/**
 * adminUsersDelete
 */
Template.adminUsersDelete.events(orion.admin.usersDeleteEvents);

/**
 * adminUsersEdit
 */
Template.adminUsersEdit.events(orion.admin.usersEditEvents);
Template.adminUsersEdit.helpers(orion.admin.usersEditHelpers);
Template.adminUsersEdit.rendered = orion.admin.usersEditRendered;

/**
 * adminUsersIndex
 */
Template.adminUsersIndex.rendered = orion.admin.usersIndexRendered;

/**
 * adminUsersIndexUser
 */
Template.adminUsersIndexUser.helpers(orion.admin.usersIndexUserHelpers);

/**
 * adminUsersIndexUserAction
 */
Template.adminUsersIndexUserAction.events(orion.admin.usersIndexUserActionEvents);

/**
 * Loading
 */
Template.adminLoading.rendered = function() {
	var options = {
		lines: 9, // The number of lines to draw
		length: 0, // The length of each line
		width: 3, // The line thickness
		radius: 11, // The radius of the inner circle
		corners: 1, // Corner roundness (0..1)
		rotate: 0, // The rotation offset
		direction: 1, // 1: clockwise, -1: counterclockwise
		color: '#000', // #rgb or #rrggbb or array of colors
		speed: 1.3, // Rounds per second
		trail: 100, // Afterglow percentage
		shadow: false, // Whether to render a shadow
		hwaccel: false, // Whether to use hardware acceleration
		className: 'spinner', // The CSS class to assign to the spinner
		zIndex: 0, // The z-index (defaults to 2000000000)
		top: '50%', // Top position relative to parent
		left: '50%' // Left position relative to parent
	};
	this.spinner = new Spinner(options);
	this.spinner.spin(this.firstNode);
};

Template.adminLoading.destroyed = function() {
  this.spinner && this.spinner.stop();
};
