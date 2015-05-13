Package.describe({
  name: 'orionjs:file-attribute',
  summary: "File attribute for orion",
  version: "1.0.1",
  git: "http://github.com/orionjs/orion"
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@1.0');

  api.use([
    'orionjs:base@1.0.0',
    'orionjs:attributes@1.0.0',
    'orionjs:filesystem@1.0.0', 
    'less'
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
