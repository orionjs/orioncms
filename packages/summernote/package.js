Package.describe({
  name: 'orionjs:summernote',
  summary: 'Summernote editor for orion',
  version: '1.8.0',
  git: 'https://github.com/orionjs/orion'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  api.use([
    'blaze-html-templates',
    'ecmascript@0.3.0',
    'orionjs:base@1.8.0',
    'orionjs:attributes@1.8.0',
    'orionjs:filesystem@1.8.0',
    'less@2.5.0_2',
    'summernote:standalone@0.6.15',
    'jquery'
    ]);

  api.imply([
    'summernote:standalone',
    ]);

  api.addFiles([
    'attribute.js',
    ]);

  api.addFiles([
    'summernote.html',
    'summernote.js',
    'summernote.less',
    ], 'client');
});
