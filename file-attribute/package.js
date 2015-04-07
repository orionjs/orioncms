Package.describe({
	name: 'orionjs:file-attribute',
	summary: "File attribute for orion",
	version: "0.0.6",
	git: "http://github.com/orionjs/file-attribute"
});

Package.onUse(function(api) {
	api.versionsFrom('METEOR@1.0');

	api.use([
		'orionjs:core@0.7.0',
		'meteor-platform',
		'less',
		'aldeed:autoform@5.1.1', 
		'orionjs:filesystem@0.0.16'
		]);

	api.addFiles([
		'lib/attribute.js',
		]);

	api.addFiles([
		'lib/template/template.html',
		'lib/template/template.less',
		'lib/template/template.js',
		], 'client');
});
