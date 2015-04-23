Package.describe({
  name: 'orionjs:filesystem-local',
  summary: 'Local storage for orion:filesystem',
  version: '0.1.0',
  git: 'https://github.com/orionjs/filesystem-local'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  api.use([
    'orionjs:core@1.0.0',
    'orionjs:filesystem@1.0.0',
    'orionjs:config',
    'cfs:standard-packages',
    'cfs:filesystem',
    'cfs:graphicsmagick',
    'underscore'
    ]);

  api.addFiles([
    'filesystem-local.js',
    ]);

});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('orionjs:filesystem');
});
