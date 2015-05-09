Package.describe({
  name: 'orionjs:lang-fr',
  summary: 'Orion - French language',
  git: 'https://github.com/orionjs/orion',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');
  api.addFiles('lang-fr.js');
});
