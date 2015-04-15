orion.options.init('homePath')
orion.options.init('siteName');

ReactiveTemplates.set('layout', 'simpleThemeLayout');
ReactiveTemplates.set('links', 'simpleThemeSidebar');
ReactiveTemplates.set('login', 'simpleThemeLogin');
ReactiveTemplates.set('account.index', 'simpleThemeAccountIndex');
ReactiveTemplates.set('account.password', 'simpleThemeAccountPassword');
ReactiveTemplates.set('account.profile', 'simpleThemeAccountProfile');

ReactiveTemplates.set('configUpdate', 'simpleThemeConfigUpdate');
ReactiveTemplates.set('dictionaryUpdate', 'simpleThemeDictionaryUpdate');

// Set the default entity templates
orion.options.set('collectionsDefaultIndexTemplate', 'simpleThemeCollectionsIndex');
orion.options.set('collectionsDefaultCreateTemplate', 'simpleThemeCollectionsCreate');
orion.options.set('collectionsDefaultUpdateTemplate', 'simpleThemeCollectionsUpdate');
orion.options.set('collectionsDefaultDeleteTemplate', 'simpleThemeCollectionsDelete');