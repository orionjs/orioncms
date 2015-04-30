Package.describe({
  name: 'orionjs:base',
  summary: 'Orion',
  version: '1.0.1',
  git: 'https://github.com/orionjs/orion'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  api.use([
    'meteor-platform',
    'underscore',
    'nicolaslopezj:options@1.0.1',
    'nicolaslopezj:reactive-templates@1.2.0',
    'nicolaslopezj:roles@1.0.5',
    'iron:router@1.0.7',
    'zimme:iron-router-active@1.0.1',
    ]);

  api.imply([
    'meteor-platform',
    'underscore',
    'iron:router',
    'nicolaslopezj:options',
    'nicolaslopezj:reactive-templates',
    'nicolaslopezj:roles'
    ]);

  api.addFiles([
    'init.js', 
    'helpers.js', 
    'layouts.js',
    'home-route.js'
    ]);

  api.export('orion');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('orionjs:core');
});
