Package.describe({
	name: 'orionjs:filesystem',
	summary: 'Filesystem for orion',
	version: '0.0.18',
	git: 'https://github.com/orionjs/filesystem'
});

Package.onUse(function(api) {
	api.versionsFrom('1.0');

	api.use([
		'orionjs:core@0.7.0', 
		'less',
		'meteor-platform',
		'aldeed:collection2@2.3.2'
		]);

	api.addFiles([
		'lib/main.js',
		'lib/collection/init.js',
		'lib/collection/methods.js',
		'lib/routes.js',
		'lib/register.js',
		]);

	api.addFiles([
		'lib/client/helpers/helpers.js',
		'lib/client/views/index/index.html',
		'lib/client/views/index/index.js',
		'lib/client/views/index/index.less',
		'lib/client/views/show/show.html',
		'lib/client/views/show/show.js',
		'lib/client/views/create/create.html',
		'lib/client/views/create/create.js',
		'lib/client/views/create/create.less',
		'lib/client/views/delete/delete.html',
		'lib/client/views/delete/delete.js',
		], 'client');

	api.addFiles([
		'lib/collection/publications.js',
		], 'server');
});

Package.onTest(function(api) {
	api.use('tinytest');
	api.use('orionjs:filesystem');
});
