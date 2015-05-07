Package.describe({
  name: 'orionjs:filesystem',
  summary: 'Orion Filesystem',
  version: '1.0.1',
  git: 'https://github.com/orionjs/orion'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  api.use([
    'orionjs:base@1.0.0',
    'aldeed:collection2@2.3.2'
    ]);

  api.imply([
    'aldeed:collection2@2.3.2'
    ]);

  api.addFiles([
    'filesystem.js',
    ]);

  api.addFiles([
    'filesystem_server.js',
    ], 'server');

  api.addFiles([
    'filesystem_client.js',
    'helpers.js',
    ], 'client');

  api.export('orion');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('orionjs:core');
});
