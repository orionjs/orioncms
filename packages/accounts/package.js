Package.describe({
  name: 'orionjs:accounts',
  summary: 'Orion accuonts mannager',
  version: '1.0.0',
  git: 'https://github.com/orionjs/orion'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  api.use([
    'orionjs:base',
    'accounts-base',
    'useraccounts:core@1.8.1',
    ]);

  api.imply([
    'accounts-base',
    'useraccounts:core'
    ]);

  api.addFiles([
    'accounts.js',
    'admin.js'
    ]);

  api.export('orion');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('orionjs:core');
});
