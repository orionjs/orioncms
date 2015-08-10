Package.describe({
  name: 'orionjs:froala',
  summary: 'Froala editor for orion',
  version: '1.4.0',
  git: 'https://github.com/orionjs/orion'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  api.use([
    'orionjs:base@1.4.0',
    'orionjs:attributes@1.4.0',
    'less',
    'orionjs:filesystem@1.4.0',
    'froala:editor@1.2.8',
    ]);

  api.imply([
    'froala:editor',
    ]);

  api.addFiles([
    'attribute.js',
    ]);

  api.addFiles([
    'froala.html',
    'froala.js',
    'froala.less',
    ], 'client');
});
