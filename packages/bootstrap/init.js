Options.init('homePath')
Options.init('siteName');

ReactiveTemplates.set('layout', 'simpleThemeLayout');
ReactiveTemplates.set('links', 'simpleThemeSidebar');
ReactiveTemplates.set('login', 'simpleThemeLogin');
ReactiveTemplates.set('account.index', 'simpleThemeAccountIndex');
ReactiveTemplates.set('account.password', 'simpleThemeAccountPassword');
ReactiveTemplates.set('account.profile', 'simpleThemeAccountProfile');

ReactiveTemplates.set('configUpdate', 'simpleThemeConfigUpdate');
ReactiveTemplates.set('dictionaryUpdate', 'simpleThemeDictionaryUpdate');

// Set the default entity templates
Options.set('collectionsDefaultIndexTemplate', 'simpleThemeCollectionsIndex');
Options.set('collectionsDefaultCreateTemplate', 'simpleThemeCollectionsCreate');
Options.set('collectionsDefaultUpdateTemplate', 'simpleThemeCollectionsUpdate');
Options.set('collectionsDefaultDeleteTemplate', 'simpleThemeCollectionsDelete');