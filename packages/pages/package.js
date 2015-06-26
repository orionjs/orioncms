Package.describe({
	name: 'orionjs:pages',
	summary: 'Pages for Orion CMS',
	version: '1.2.0',
	git: 'https://github.com/orionjs/pages'
});

Package.onUse(function(api) {
	api.versionsFrom('1.0');

	api.use([
		'meteor-platform',
		'orionjs:base@1.2.0',
		'aldeed:collection2@2.0.0',
		'aldeed:autoform@5.1.2'
		]);

	api.use(['aldeed:tabular@1.2.0', 'nicolaslopezj:tabular-materialize@1.2.1'], {
		weak: true
	});

	api.imply([

		]);

	api.addFiles([
		'pages.js',
		'admin.js',
		]);

	api.addFiles([
		'pages_server.js',
		], 'server');

	api.addFiles([
		'pages_client.js',
		], 'client');

});
