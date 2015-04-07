Package.describe({
	name: 'orionjs:s3',
	summary: 'S3 storage for orion:filesystem',
	version: '0.0.14',
	git: 'https://github.com/orionjs/s3'
});

Package.onUse(function(api) {
	api.versionsFrom('1.0');

	api.use([
		'orionjs:core@0.7.0',
		'orionjs:filesystem@0.0.17', 
		'lepozepo:s3@=4.1.3'
		]);

	api.addFiles([
		'lib/main.js',
		]);

});

Package.onTest(function(api) {
	api.use('tinytest');
	api.use('orionjs:filesystem');
});
