Package.describe({
	name: 'orionjs:users-attribute',
	summary: 'Attatch users in entities or the dictionary in orion',
	version: '0.0.3',
	git: 'https://github.com/orionjs/users-attribute'
});

Package.onUse(function(api) {
	api.versionsFrom('1.0');

	api.use([
		'orionjs:core@0.7.1',
		'meteor-platform',
		'aldeed:autoform@5.1.1', 
		'jeremy:selectize@0.12.1',
		'orionjs:relationships@0.0.1',
		'less',
		]);

	api.imply([
		'jeremy:selectize',
		'orionjs:relationships'
		]);

	api.addFiles([
		'attribute/main.js',
		]);

	api.addFiles([
		'attribute/client.less'
		], 'client');
});
