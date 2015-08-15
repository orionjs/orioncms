Package.describe({
  name: 'orionjs:namespace',
  version: '1.3.0',
  summary: 'Orion - Namespace',
  git: 'https://github.com/orionjs/orion',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  // Meteor version compatibility
  api.versionsFrom('1.0');

  // Exported files
  api.addFiles([
    'init.js',
  ]);

  // Exported variables
  api.export('orion');
});
