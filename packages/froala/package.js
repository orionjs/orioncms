Package.describe({
  name: 'orionjs:froala',
  summary: 'Froala editor for orion',
  version: '2.0.0',
  git: 'https://github.com/orionjs/orion'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  api.use([
    'nimble:restivus@0.8.4',
    'orionjs:base@1.6.0',
    'orionjs:attributes@1.6.0',
    'less@2.5.0_1',
    'orionjs:filesystem@1.6.0',
    'froala:editor@2.0.0-rc.3-2',
    ]);

  api.imply([
    'froala:editor',
    ]);

  api.addFiles([
    'attribute.js',
    ]);
  api.addFiles([
    'froala_server.js',
    ], 'server');

  api.addFiles([
    'froala.html',
    'froala.js',
    'froala.less',
    ], 'client');
});
