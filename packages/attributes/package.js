Package.describe({
  name: 'orionjs:attributes',
  summary: 'Orion attributes',
  version: '1.0.0',
  git: 'https://github.com/orionjs/orion'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  api.use([
    'orionjs:base',
    'aldeed:collection2@2.0.0',
    'aldeed:autoform@5.1.1',
    ]);

  api.imply([
    'aldeed:collection2',
    'aldeed:autoform',
    ]);

  api.addFiles([
    'attributes.js'
    ]);

  // Created by attribute
  api.addFiles('created-by/created-by-attribute.js');
  api.addFiles('created-by/created-by-attribute.html', 'client');

  api.export('orion');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('orionjs:core');
});
