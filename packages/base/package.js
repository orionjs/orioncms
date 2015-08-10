Package.describe({
  name: 'orionjs:base',
  summary: 'Orion',
<<<<<<< d7b5207b4790c1b09545c50e7a26a40156fec7a3
  version: '1.4.1',
=======
  version: '1.3.1',
>>>>>>> Linting & Hoisting & package bumped
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
    'nicolaslopezj:router-layer@0.0.8',
    'aldeed:simple-schema@1.3.3',
<<<<<<< d7b5207b4790c1b09545c50e7a26a40156fec7a3
    'orionjs:lang-en@1.4.0'
=======
    'zimme:active-route@2.3.0',
    'orionjs:lang-en@1.3.1'
>>>>>>> Linting & Hoisting & package bumped
    ]);

  api.imply([
    'meteor-platform',
    'underscore',
    'nicolaslopezj:router-layer',
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
  ], 'client');

  api.export('orion');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('orionjs:core');
});
