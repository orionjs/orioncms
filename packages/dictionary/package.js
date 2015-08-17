Package.describe({
  name: 'orionjs:dictionary',
  summary: 'Meteor collection with some magic',
  version: '1.4.1',
  git: 'https://github.com/orionjs/orion'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  api.use([
    'orionjs:base@1.4.2',
    'aldeed:simple-schema@1.3.3',
    'aldeed:collection2@2.3.3',
    ]);

  api.imply([
    'aldeed:simple-schema',
    'aldeed:collection2'
    ]);

  api.addFiles([
    'dictionary.js',
    'admin.js',
    ]);

  api.addFiles([
    'dictionary_server.js',
    ], 'server');

  api.addFiles([
    'dictionary_client.js',
    ], 'client');

  api.export('orion');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('orionjs:core');
});
