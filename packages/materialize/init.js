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

// Orion attributes replace
Tracker.autorun(function () {
  if (ReactiveTemplates.isRequested('attribute.file')) {
    ReactiveTemplates.set('attribute.file', 'orionMaterializeFileAttribute');
  }
});

if (Meteor.isClient) {
  AutoForm.setDefaultTemplate('materialize');
}

// Pages
ReactiveTemplates.set('pages.index', 'orionMaterializePagesIndex');
ReactiveTemplates.set('pages.create', 'orionMaterializePagesCreate');
ReactiveTemplates.set('pages.update', 'orionMaterializePagesUpdate');
ReactiveTemplates.set('pages.delete', 'orionMaterializePagesDelete');
