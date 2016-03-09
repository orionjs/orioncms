Package.describe({
  name: 'orionjs:lang-en',
  version: '1.8.0',
  summary: 'Orion - Default english language',
  git: 'https://github.com/orionjs/orion',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  api.use('ecmascript');
  api.use('anti:i18n@0.4.3');
  api.use('softwarerero:accounts-t9n@1.1.4');
  api.imply('anti:i18n');
  api.imply('softwarerero:accounts-t9n');

  api.addFiles('init.js');
  api.addFiles('en.js');
});
