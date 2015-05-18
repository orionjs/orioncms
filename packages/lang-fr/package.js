Package.describe({
  name: 'orionjs:lang-fr',
  version: '1.1.0',
  summary: 'Orion - French language',
  git: 'https://github.com/orionjs/orion',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');

  api.use('orionjs:lang-en');
  api.imply('orionjs:lang-en');

  api.addFiles('fr.i18n.json');
});
