Package.describe({
  name: 'orionjs:core',
  summary: 'Orion',
  version: '1.0.0',
  git: 'https://github.com/orionjs/orion'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  api.use([
    'orionjs:base',
    'orionjs:entities',
    'orionjs:dictionary',
    ]);

  api.imply([
    'orionjs:base',
    'orionjs:entities',
    'orionjs:dictionary',
    ]);

  api.export('orion');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('orionjs:core');
});
