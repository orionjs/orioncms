Package.describe({
  name: 'orionjs:file-attribute',
  summary: 'File attribute for orion',
  version: '1.4.1',
  git: 'http://github.com/orionjs/orion'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  api.use([
    'orionjs:base@1.4.0',
    'orionjs:attributes@1.4.0',
    'orionjs:filesystem@1.4.0',
    'less@2.5.0_1'
    ]);

  api.addFiles([
    'attribute.js',
    ]);

  api.addFiles([
    'file.html',
    'file.less',
    'file.js',
    ], 'client');
});
