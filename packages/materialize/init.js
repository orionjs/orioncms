Options.init('homePath')
Options.init('siteName');

ReactiveTemplates.request('tabs', 'orionMaterializeTabs');

ReactiveTemplates.set('layout', 'orionMaterializeLayout');
ReactiveTemplates.set('outAdminLayout', 'orionMaterializeOutAdminLayout');

ReactiveTemplates.set('links', 'orionMaterializeSidebar');
ReactiveTemplates.set('login', 'orionMaterializeLogin');
ReactiveTemplates.set('registerWithInvitation', 'orionMaterializeRegisterWithInvitation');

ReactiveTemplates.set('myAccount.index', 'orionMaterializeAccountIndex');
ReactiveTemplates.set('myAccount.password', 'orionMaterializeAccountPassword');
ReactiveTemplates.set('myAccount.profile', 'orionMaterializeAccountProfile');

ReactiveTemplates.set('accounts.index', 'orionMaterializeAccountsIndex');
ReactiveTemplates.set('accounts.update.roles', 'orionMaterializeAccountsUpdateRoles');
ReactiveTemplates.set('accounts.invite', 'orionMaterializeAccountsInvite');

ReactiveTemplates.set('configUpdate', 'orionMaterializeConfigUpdate');
ReactiveTemplates.set('dictionaryUpdate', 'orionMaterializeDictionaryUpdate');

// Set the default entity templates
Options.set('collectionsDefaultIndexTemplate', 'orionMaterializeCollectionsIndex');
Options.set('collectionsDefaultCreateTemplate', 'orionMaterializeCollectionsCreate');
Options.set('collectionsDefaultUpdateTemplate', 'orionMaterializeCollectionsUpdate');
Options.set('collectionsDefaultDeleteTemplate', 'orionMaterializeCollectionsDelete');

AutoForm.setDefaultTemplate('materialize');

// Orion attributes replace
Meteor.startup(function () {
  ReactiveTemplates.set('attribute.file', 'orionMaterializeFileAttribute');
});