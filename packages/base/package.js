Package.describe({
  name: 'orionjs:base',
  summary: 'Orion',
  version: '1.3.0',
  git: 'https://github.com/orionjs/orion'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  api.use([
    'meteor-platform',
    'underscore',
    'nicolaslopezj:options@1.0.1',
    'nicolaslopezj:reactive-templates@1.2.1',
    'nicolaslopezj:roles@1.2.0',
    'iron:router@1.0.9',
    'aldeed:simple-schema@1.3.3',
    'zimme:active-route@2.0.0',
    'orionjs:lang-en@1.3.0'
    ]);

  api.imply([
    'meteor-platform',
    'underscore',
    'iron:router',
    'nicolaslopezj:options',
    'nicolaslopezj:reactive-templates',
    'nicolaslopezj:roles',
    'orionjs:lang-en'
    ]);

  api.addFiles([
    'init.js',
    'helpers.js',
    'home-route.js',
    'layouts.js',
    ]);

  api.addFiles([
    'helpers_client.js',
    'links.js'
    ], 'client')

  api.export('orion');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('orionjs:core');
});
