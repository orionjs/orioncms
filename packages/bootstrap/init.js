Options.init('homePath')
Options.init('siteName');

ReactiveTemplates.request('tabs', 'orionBootstrapTabs');

ReactiveTemplates.set('layout', 'orionBootstrapLayout');
ReactiveTemplates.set('outAdminLayout', 'orionBootstrapOutAdminLayout');

ReactiveTemplates.set('links', 'orionBootstrapSidebar');
ReactiveTemplates.set('login', 'orionBootstrapLogin');
ReactiveTemplates.set('registerWithInvitation', 'orionBootstrapRegisterWithInvitation');

ReactiveTemplates.set('myAccount.index', 'orionBootstrapAccountIndex');
ReactiveTemplates.set('myAccount.password', 'orionBootstrapAccountPassword');
ReactiveTemplates.set('myAccount.profile', 'orionBootstrapAccountProfile');

ReactiveTemplates.set('accounts.index', 'orionBootstrapAccountsIndex');
ReactiveTemplates.set('accounts.update.roles', 'orionBootstrapAccountsUpdateRoles');
ReactiveTemplates.set('accounts.invite', 'orionBootstrapAccountsInvite');

ReactiveTemplates.set('configUpdate', 'orionBootstrapConfigUpdate');
ReactiveTemplates.set('dictionaryUpdate', 'orionBootstrapDictionaryUpdate');

// Set the default entity templates
Options.set('collectionsDefaultIndexTemplate', 'orionBootstrapCollectionsIndex');
Options.set('collectionsDefaultCreateTemplate', 'orionBootstrapCollectionsCreate');
Options.set('collectionsDefaultUpdateTemplate', 'orionBootstrapCollectionsUpdate');
Options.set('collectionsDefaultDeleteTemplate', 'orionBootstrapCollectionsDelete');