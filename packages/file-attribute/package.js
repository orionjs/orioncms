Package.describe({
  name: 'orionjs:file-attribute',
  summary: "File attribute for orion",
  version: "1.0.0",
  git: "http://github.com/orionjs/orion"
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@1.0');

  api.use([
    'orionjs:base',
    'orionjs:attributes',
    'orionjs:filesystem', 
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
