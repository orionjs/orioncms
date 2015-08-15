Package.describe({
  name: 'orionjs:core',
  summary: 'Orion',
  version: '1.4.1',
  git: 'https://github.com/orionjs/orion'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  api.use([
    'orionjs:base@1.4.2',
    'orionjs:accounts@1.4.3',
    'orionjs:config@1.4.1',
    'orionjs:collections@1.4.2',
    'orionjs:dictionary@1.4.1',
    'orionjs:attributes@1.4.1',
    'orionjs:lang-en@1.4.0'
    ]);

  api.imply([
    'orionjs:logging',
    'orionjs:lang-en',
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
  api.use([
    'tinytest',
    'orionjs:core'
  ]);
});
