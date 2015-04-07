Package.describe({
	name: 'orionjs:relationships',
	summary: 'Define and use relationships between meteor collections, entities and the dictionary',
	version: '0.0.3',
	git: 'https://github.com/orionjs/relationships'
});

Package.onUse(function(api) {
	api.versionsFrom('1.0');

	api.use([
		'orionjs:core@0.7.1',
		'meteor-platform',
		'aldeed:autoform@5.1.1', 
		'jeremy:selectize@0.12.1',
		'less',
		]);

	api.imply([
		'jeremy:selectize',
		]);

	api.addFiles([
		'hasOne/main.js',
		'hasMany/main.js',
		]);

	api.addFiles([
		'hasOne/client.html',
		'hasOne/client.js',
		'hasOne/client.less',
		'hasMany/client.html',
		'hasMany/client.js',
		'hasMany/client.less',
		], 'client');
});
