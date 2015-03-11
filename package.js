Package.describe({
	name: 'orionjs:core',
	summary: 'Simple and powerful admin panel for meteor',
	version: '0.5.2',
	git: 'https://github.com/orionjs/core'
});

Package.onUse(function(api) {
	api.versionsFrom('1.0');

	api.use([
		'meteor-platform',
		'meteorhacks:subs-manager@1.1.0',
		'accounts-base',
		'accounts-password', 
		'dburles:collection-helpers@1.0.2', 
		'aldeed:collection2@2.0.0',
		'aldeed:tabular@1.0.4',  
		'meteorhacks:inject-initial@1.0.2',
		'aldeed:autoform@4.2.1', 
		'matb33:collection-hooks@0.7.7',
		'iron:router@1.0.7', 
		'zimme:iron-router-active@1.0.0', 
		'aldeed:delete-button@1.0.0', 
		'useraccounts:core@1.8.1',
		'manuelschoebel:ms-seo@0.4.1',
		]);

	api.imply([
		'accounts-base',
		'accounts-password',
		'dburles:collection-helpers',
		'aldeed:collection2', 
		'aldeed:autoform', 
		'aldeed:tabular',
		'matb33:collection-hooks',
		'iron:router',
		'manuelschoebel:ms-seo',
		'useraccounts:core'
		]);

	api.addFiles([
		'main/common.js',
		'config/common.js',
		'users/common.js',
		'users/invitations.js',
		'users/accounts-templates.js',
		'attributes/common.js',
		'dictionary/common.js',
		'entities/common.js', 
		'admin/api.js',
		'admin/routes.js',
		]);

	api.addFiles([
		'config/server.js',
		'users/server.js',
		'dictionary/server.js',
		'entities/server.js'
		], 'server');

	api.addFiles([
		'config/client.js',
		'users/client.js',
		'dictionary/client.js',
		'entities/client.js',
		'admin/client-common/accounts.js',
		'admin/client-common/base.js',
		'admin/client-common/config.js',
		'admin/client-common/dictionary.js',
		'admin/client-common/entities.js',
		'admin/client-common/users.js',
		], 'client');

	api.export('orion');
});

Package.onTest(function(api) {
	api.use('tinytest');
	api.use('orionjs:core');
});
