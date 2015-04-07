Package.describe({
	name: 'orionjs:froala-editor',
	summary: 'Froala editor for orion',
	version: '0.1.3',
	git: 'https://github.com/orionjs/froala-editor'
});

Package.onUse(function(api) {
	api.versionsFrom('1.0');

	api.use([
		'orionjs:core@0.7.0',
		'meteor-platform',
		'less',
		'aldeed:autoform@5.1.1', 
		'froala:editor@1.2.4',
		'orionjs:filesystem@0.0.13',
		]);

	api.imply([
		'froala:editor',
		]);

	api.addFiles([
		'lib/attribute.js',
		]);

	api.addFiles([
		'lib/template/template.html',
		'lib/template/template.js',
		'lib/template/template.less',
		], 'client');
});
