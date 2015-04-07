Package.describe({
	name: 'orionjs:entities',
	summary: 'Orion entities',
	version: '1.0.0',
	git: 'https://github.com/orionjs/orion'
});

Package.onUse(function(api) {
	api.versionsFrom('1.0');

	api.use([
		]);

	api.imply([
		]);

	api.addFiles([
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
