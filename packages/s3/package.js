Package.describe({
  name: 'orionjs:s3',
  summary: 'Collection fs S3',
  version: '1.0.0',
  git: 'https://github.com/orionjs/orion'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  api.use([
    'orionjs:base',
    'orionjs:filesystem',
    ]);

  api.imply([
    ]);

  api.addFiles([
    's3.js',
    ]);

  api.addFiles([
    
    ], 'server');

  api.addFiles([
    ], 'client');

  api.export('orion');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('orionjs:core');
});
