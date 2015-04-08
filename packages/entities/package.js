Package.describe({
  name: 'orionjs:entities',
  summary: 'Meteor collection with some magic',
  version: '1.0.0',
  git: 'https://github.com/orionjs/orion'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  api.use([
    'orionjs:base',
    'underscore',
    'aldeed:simple-schema@1.3.2',
    'aldeed:collection2@2.3.3',
    ]);

  api.imply([
    'aldeed:simple-schema',
    'aldeed:collection2'
    ]);

  api.addFiles([
    'entities.js',
    ]);

  api.addFiles([
    ], 'server');

  api.addFiles([
    ], 'client');

  api.export('orion');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('orionjs:core');
});
