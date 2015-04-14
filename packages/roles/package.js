Package.describe({
  name: 'orionjs:roles',
  summary: 'Orion roles',
  version: '1.0.0',
  git: 'https://github.com/orionjs/orion'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  api.use([
    'meteor-platform',
    'accounts-base',
    'aldeed:simple-schema@1.3.2',
    'aldeed:collection2@2.3.3',
    'dburles:collection-helpers@1.0.3',
    ]);

  api.imply([
    ]);

  api.addFiles([
    'roles.js',
    ]);
  api.addFiles([
    'roles_server.js',
    ], 'server');

  api.addFiles([
    'roles_client.js',
    ], 'client');

  api.export('Roles');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('orionjs:core');
});
