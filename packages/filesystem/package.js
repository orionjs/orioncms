Package.describe({
  name: 'orionjs:filesystem',
  summary: 'Orion Filesystem',
  version: '1.0.0',
  git: 'https://github.com/orionjs/orion'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  api.use([
    'orionjs:base',
    'aldeed:collection2@2.3.2'
    ]);

  api.imply([
    'aldeed:collection2@2.3.2'
    ]);

  api.addFiles([
    'filesystem.js',
    ], 'client');

  api.export('orion');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('orionjs:core');
});
