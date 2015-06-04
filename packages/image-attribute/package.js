Package.describe({
  name: 'orionjs:image-attribute',
  summary: 'Image attribute for orion',
  version: '1.1.1',
  git: 'http://github.com/orionjs/orion'
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@1.0');

  api.use([
    'orionjs:base@1.1.0',
    'orionjs:attributes@1.1.0',
    'orionjs:filesystem@1.1.0',
    'less'
    ]);

  api.addFiles([
    'attribute.js',
    ]);

  api.addFiles([
    'color-thief.js',
    'color-helper.js',
    'image.html',
    'image.less',
    'image.js',
    ], 'client');

  api.export('ColorThief');
});
