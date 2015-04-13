Package.describe({
  name: 'orionjs:config',
  summary: 'Orion Filesystem',
  version: '1.0.0',
  git: 'https://github.com/orionjs/orion'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  api.use([
    'orionjs:base',
    'aldeed:simple-schema@1.3.2',
    'aldeed:collection2@2.3.3',
    'matb33:collection-hooks',
    'meteorhacks:inject-initial'
    ]);

  api.imply([
    ]);

  api.addFiles([
    'config.js',
    'admin.js'
    ]);

  api.addFiles([
    'config_server.js'
    ], 'server');

  api.addFiles([
    'config_client.js'
    ], 'client');

  api.export('orion');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('orionjs:core');
});
