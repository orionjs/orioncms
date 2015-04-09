Package.describe({
  name: 'orionjs:tabular',
  summary: 'Creates a tabular table automatically when orion.collections are created',
  version: '1.0.0',
  git: 'https://github.com/orionjs/orion'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  api.use([
    'meteor-platform',
    'orionjs:collections',
    'aldeed:tabular@1.1.0',
    ]);


  api.imply(['aldeed:tabular']);

  api.addFiles([
    'tabular.js', 
    ]);
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('orionjs:core');
});
