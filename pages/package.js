Package.describe({
	name: 'orionjs:pages',
	summary: 'Pages for Orion CMS',
	version: '0.0.3',
	git: 'https://github.com/orionjs/pages'
});

Package.onUse(function(api) {
	api.versionsFrom('1.0');

	api.use([
		'meteor-platform',
		'orionjs:core@0.7.0',
		'less',
		'aldeed:collection2@2.0.0',
		]);

	api.imply([
		'less', 
		]);

	api.addFiles([
		'lib/main.js',
		'lib/routes.js',
		'lib/register.js'
		]);

	api.addFiles([
		'views/index/index.html',
		'views/update/update.html',
		'views/update/update.js',
		'views/delete/delete.html',
		'views/delete/delete.js',
		'views/create/create.html',
		'views/create/create.js',
		'lib/helpers.js',
		], 'client');

});