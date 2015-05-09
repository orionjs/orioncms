Package.describe({
  name: 'orionjs:file-attribute',
  summary: 'File attribute for orion',
  version: '1.1.0',
  git: 'http://github.com/orionjs/orion'
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@1.0');

  api.use([
    'orionjs:base@1.0.0',
    'orionjs:attributes@1.0.0',
    'orionjs:filesystem@1.1.0',
    'less',
    'msgfmt:core@2.0.0-preview.7'
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
