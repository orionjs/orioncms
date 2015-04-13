Package.describe({
  name: 'orionjs:simple-theme',
  summary: 'A simple theme for orion',
  version: '1.0.0',
  git: 'https://github.com/orionjs/orion'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  api.use([
    'meteor-platform',
    'orionjs:core',
    'less',
    'iron:layout@1.0.7',
    'aldeed:autoform@5.1.2',
    'orionjs:tabular'
    ]);

  api.imply([
    'orionjs:core',
    'iron:layout',
    'aldeed:autoform',
    ]);

  api.addFiles([
    'init.js',
    ]);

  api.addFiles([
    'views/layout/layout.html',
    'views/layout/layout.js',
    'views/layout/layout.less',
    'views/sidebar/sidebar.html',
    'views/sidebar/sidebar.less',
    'views/config/update.html',
    'views/dictionary/update.html',
    'views/collections/index.html',
    'views/collections/index.js',
    'views/collections/index.less',
    'views/collections/create.html',
    'views/collections/create.js',
    'views/collections/update.html',
    'views/collections/update.js',
    'views/collections/delete.html',
    ], 'client');

  api.export('orion');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('orionjs:core');
});
