Package.describe({
  name: 'orionjs:lang-fr',
  version: '1.1.0',
  summary: 'Orion - French language',
  git: 'https://github.com/orionjs/orion',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');

  api.use([
    'coffeescript',
    'anti:i18n@0.4.3',
    'softwarerero:accounts-t9n@1.1.0',
  ]);
  api.imply('anti:i18n@0.4.3');

  api.addFiles('fr.coffee');
});
