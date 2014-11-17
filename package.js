Package.describe({
	name: 'orionjs:core',
	summary: 'Simple CMS for meteor',
	version: '0.0.1',
	git: 'https://github.com/orionjs/core'
});

Package.onUse(function(api) {
	api.versionsFrom('1.0');

	api.use([
		'meteor-platform',
		'meteorhacks:subs-manager@1.1.0',
		'accounts-base',
		'accounts-password', 
		'dburles:collection-helpers@0.1.0', 
		'aldeed:collection2@2.0.0', 
		]);

	api.imply([
		'accounts-base',
		'accounts-password',
		'dburles:collection-helpers',
		]);

	api.addFiles([
		'lib/init.js',
		'lib/dictionary/init.js',
		'lib/dictionary/permissions.js',
		'lib/entities/init.js',
		'lib/entities/add.js',
		'lib/subscriptions/init.js',
		'lib/attributes/init.js',
		
		]);

	api.addFiles([
		'lib/dictionary/fixtures.js',
		'lib/dictionary/publications.js',
		'lib/entities/publications.js',

		], 'server');

	api.addFiles([
		'lib/dictionary/helpers.js',
		], 'client');
	
	api.export('orion');
});










Package.onTest(function(api) {
	api.use('tinytest');
	api.use('orionjs:core');
	api.addFiles('orionjs:core-tests.js');
});
