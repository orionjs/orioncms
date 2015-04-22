Package.describe({
  name: 'orionjs:accounts',
  summary: 'Orion accounts mannager',
  version: '1.0.0',
  git: 'https://github.com/orionjs/orion'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  api.use([
    'orionjs:base',
    'orionjs:attributes',
    'accounts-base',
    'useraccounts:core@1.8.1',
    'aldeed:simple-schema@1.3.2',
    'matb33:collection-hooks@0.7.11',
    'meteorhacks:inject-initial@1.0.2',
    ]);

  api.imply([
    'accounts-base',
    'useraccounts:core',
    'matb33:collection-hooks',
    ]);

  api.addFiles([
    'accounts.js',
    'authentication/login.js',
    'authentication/secure-routes.js',
    'my-account/admin.js',
    'accounts-tab/admin.js',
    ])

  api.addFiles([
    'accounts_server.js'
    ], 'server');

  api.addFiles([
    'accounts_client.js',
    ], 'client');

  // Created by attribute
  api.addFiles('created-by/created-by-attribute.js');
  api.addFiles('created-by/created-by-attribute.html', 'client');

  api.export('orion');
});

Package.onTest(function(api) {
  api.use('tinytest');
});
