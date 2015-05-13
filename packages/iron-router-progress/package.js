Package.describe({
	name    : 'orionjs:iron-router-progress',
	version : '1.0.3',
	summary : 'Progressbar for iron:router',
	git     : 'https://github.com/orionjs/orion.git'
});

Package.onUse(function (api) {
	api.versionsFrom('METEOR@1.0');

	api.use([
		'coffeescript',
		'less',
		'underscore',
		'templating',
		'jquery',
		'reactive-var',
		'tracker',
		'iron:router@1.0.0',
		'iron:layout@1.0.0'
	], 'client');

	api.imply('iron:router');

	api.addFiles([
		'progress.html',
		'progress.coffee',
		'progress.less'
	], 'client');
});
