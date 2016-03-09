Package.describe({
  name: 'orionjs:image-attribute',
  summary: 'Image attribute for orion',
  version: '1.8.0',
  git: 'http://github.com/orionjs/orion'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  api.use([
    'blaze-html-templates',
    'ecmascript',
    'orionjs:base@1.8.0',
    'orionjs:attributes@1.8.0',
    'orionjs:filesystem@1.8.0',
    'less@2.5.0_1'
    ]);

  api.addFiles([
    'attribute.js',
    ]);

  api.addFiles([
    'colibri.js',
    'helper.js',
    'image.html',
    'image.less',
    'image.js',
    'images.html',
    'images.js',
    ], 'client');

  api.export('Colibri');
});
