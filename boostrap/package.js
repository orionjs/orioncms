Package.describe({
	name: 'orionjs:bootstrap',
	summary: 'Orion CMS styled for bootstrap',
	version: '0.1.4',
	git: 'https://github.com/orionjs/bootstrap'
});

Npm.depends({
	"spin.js": "2.0.1"
});

Package.onUse(function(api) {
	api.versionsFrom('1.0');

	api.use([
		'meteor-platform',
		'orionjs:core@0.7.5',
		'less',
		'useraccounts:bootstrap@1.2.3'
		]);

	api.imply([
		'orionjs:core',
		'less',
		'useraccounts:bootstrap'
		]);

	api.addFiles([
		'.npm/package/node_modules/spin.js/spin.js',
		'styles/config.less',
		'styles/dictionary.less',
		'styles/entities.less',
		'styles/forms.less',
		'styles/layout.less',
		'styles/loading.less',
		'styles/main.less',
		'styles/nav.less',
		'styles/out.less',
		'styles/sidebar.less',
		'views/accounts.html',
		'views/base.html',
		'views/config.html',
		'views/dictionary.html',
		'views/entities.html',
		'views/extras.html',
		'views/loading.html',
		'views/users.html',
		'views/common.js',
		], 'client');

});
