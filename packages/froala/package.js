Package.describe({
  name: 'orionjs:froala',
  summary: 'Summernote editor for orion',
  version: '1.0.0',
  git: 'https://github.com/orionjs/orion'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  api.use([
    'orionjs:base',
    'orionjs:attributes',
    'less',
    'orionjs:filesystem', 
    'froala:editor@1.2.4',
    ]);

  api.imply([
    'froala:editor',
    ]);

  api.addFiles([
    'attribute.js',
    ]);

  api.addFiles([
    'froala.html',
    'froala.js',
    'froala.less',
    ], 'client');
});
