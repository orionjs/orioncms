Package.describe({
  name: 'orionjs:base',
  summary: 'Orion',
  version: '1.1.2',
  git: 'https://github.com/orionjs/orion'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  api.use([
    'meteor-platform',
    'underscore',
    'nicolaslopezj:options@1.0.1',
    'nicolaslopezj:reactive-templates@1.2.0',
    'nicolaslopezj:roles@1.1.2',
    'iron:router@1.0.7',
    'zimme:active-route@2.0.0',
    'orionjs:lang-en@1.1.0'
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
    'layouts.js',
    'home-route.js'
    ]);

  api.addFiles([
    'helpers_client.js'
    ], 'client')

  api.export('orion');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('orionjs:core');
});
