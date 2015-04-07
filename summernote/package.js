Package.describe({
	name: 'orionjs:summernote',
	summary: 'Summernote editor for orion',
	version: '0.2.8',
	git: 'https://github.com/orionjs/summernote'
});

Package.onUse(function(api) {
	api.versionsFrom('1.0');

	api.use([
		'orionjs:core@0.7.0',
		'meteor-platform',
		'less',
		'aldeed:autoform@5.1.1', 
		'orionjs:filesystem@0.0.13', 
		'summernote:standalone@0.6.0',
		'jquery@1.0.0'
		]);

	api.imply([
		'summernote:standalone',
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
