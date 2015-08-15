Package.describe({
  name: 'orionjs:image-attribute',
  summary: 'Image attribute for orion',
  version: '1.4.1',
  git: 'http://github.com/orionjs/orion'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  api.use([
    'orionjs:base@1.4.2',
    'orionjs:attributes@1.4.1',
    'orionjs:filesystem@1.4.1',
    'less'
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
