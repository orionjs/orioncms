orion.options.init('homePath')
orion.options.init('siteName');

orion.templates.set('layout', 'simpleThemeLayout');
orion.templates.set('links', 'simpleThemeSidebar');
orion.templates.set('login', 'simpleThemeLogin');
orion.templates.set('account.index', 'simpleThemeAccountIndex');
orion.templates.set('account.password', 'simpleThemeAccountPassword');
orion.templates.set('account.profile', 'simpleThemeAccountProfile');

orion.templates.set('configUpdate', 'simpleThemeConfigUpdate');
orion.templates.set('dictionaryUpdate', 'simpleThemeDictionaryUpdate');

// Set the default entity templates
orion.options.set('collectionsDefaultIndexTemplate', 'simpleThemeCollectionsIndex');
orion.options.set('collectionsDefaultCreateTemplate', 'simpleThemeCollectionsCreate');
orion.options.set('collectionsDefaultUpdateTemplate', 'simpleThemeCollectionsUpdate');
orion.options.set('collectionsDefaultDeleteTemplate', 'simpleThemeCollectionsDelete');