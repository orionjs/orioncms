Package.describe({
  name: 'orionjs:froala',
  summary: 'Froala editor for orion',
  version: '1.8.0',
  git: 'https://github.com/orionjs/orion'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  api.use([
    'blaze-html-templates@1.0.1',
    'ecmascript@0.1.6',
    'orionjs:base@1.8.0',
    'orionjs:attributes@1.8.0',
    'less@2.5.0_1',
    'orionjs:filesystem@1.8.0',
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
