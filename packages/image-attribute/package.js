Package.describe({
  name: 'orionjs:image-attribute',
  summary: "Image attribute for orion",
  version: "1.0.0",
  git: "http://github.com/orionjs/orion"
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@1.0');

  api.use([
    'orionjs:base@1.0.0',
    'orionjs:attributes@1.0.0',
    'orionjs:filesystem@1.0.0', 
    'jonblum:jquery-cropper@0.9.2',
    'less'
    ]);

  api.addFiles([
    'attribute.js',
    ]);

  api.addFiles([
    ], 'client');
});
