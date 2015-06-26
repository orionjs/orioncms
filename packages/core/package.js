Package.describe({
  name: 'orionjs:core',
  summary: 'Orion',
  version: '1.1.0',
  git: 'https://github.com/orionjs/orion'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  api.use([
    'orionjs:base@1.1.0',
    'orionjs:accounts@1.1.0',
    'orionjs:config@1.1.0',
    'orionjs:collections@1.1.0',
    'orionjs:dictionary@1.1.0',
    'orionjs:attributes@1.1.0'
    ]);

  api.imply([
    'orionjs:lang-en@1.1.0',
    'orionjs:base',
    'orionjs:accounts',
    'orionjs:config',
    'orionjs:collections',
    'orionjs:dictionary',
    'orionjs:attributes',
    ]);

  api.export('orion');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('orionjs:core');
});
