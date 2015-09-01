Package.describe({
  name: 'orionjs:lang-de',
  version: '1.4.0',
  summary: 'Orion german language',
  git: 'https://github.com/orionjs/orion',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  api.use('orionjs:lang-en@1.4.0');
  api.imply('orionjs:lang-en');

  api.addFiles('de.js');
});
