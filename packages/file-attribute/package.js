Package.describe({
  name: 'orionjs:file-attribute',
  summary: 'File attribute for orion',
  version: '1.8.0',
  git: 'http://github.com/orionjs/orion'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  api.use([
    'blaze-html-templates@1.0.1',
    'ecmascript@0.1.6',
    'orionjs:base@1.8.0',
    'orionjs:attributes@1.8.0',
    'orionjs:filesystem@1.8.0',
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
