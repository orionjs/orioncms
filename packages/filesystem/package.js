Package.describe({
  name: 'orionjs:filesystem',
  summary: 'Orion Filesystem',
  version: '1.8.0',
  git: 'https://github.com/orionjs/orion',
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  api.use([
    'blaze-html-templates@1.0.1',
    'ecmascript@0.1.6',
    'orionjs:base@1.8.0',
    'aldeed:collection2@2.3.3',
    ]);

  api.imply([
    'aldeed:collection2',
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
