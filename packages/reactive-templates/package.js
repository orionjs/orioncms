Package.describe({
  name: 'orionjs:reactive-templates',
  summary: 'Reactive templates for meteor',
  version: '1.0.0',
  git: 'https://github.com/orionjs/orion'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  api.use([
    'meteor-platform',
    ]);

  api.addFiles([
    'templates.js', 
    ]);

  api.export('ReactiveTemplates');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('orionjs:core');
});
