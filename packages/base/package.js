Package.describe({
  name: 'orionjs:base',
  summary: 'Orion',
  version: '1.0.0',
  git: 'https://github.com/orionjs/orion'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  api.use([
    'underscore',
    ]);

  api.addFiles(['init.js', 'options.js']);

  api.export('orion');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('orionjs:core');
});
