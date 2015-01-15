Package.describe({
	name: 'orionjs:core',
	summary: 'Simple and powerful admin panel for meteor',
	version: '0.4.2',
	git: 'https://github.com/orionjs/core'
});

Npm.depends({
	"spin.js": "2.0.1"
});

Package.onUse(function(api) {
	api.versionsFrom('1.0');

	api.use([
		'meteor-platform',
		'meteorhacks:subs-manager@1.1.0',
		'accounts-base',
		'accounts-password', 
		'dburles:collection-helpers@1.0.2', 
		'aldeed:collection2@2.0.0',
		'aldeed:tabular@0.2.3',  
		'meteorhacks:inject-initial@1.0.2',
		'aldeed:autoform@4.2.1', 
		'matb33:collection-hooks@0.7.7',
		'less',
		'iron:router@1.0.1', 
		'zimme:iron-router-active@1.0.0', 
		'aldeed:delete-button@1.0.0', 
		'useraccounts:bootstrap@1.2.3',
		'manuelschoebel:ms-seo@0.4.1',
		]);

	api.imply([
		'accounts-base',
		'accounts-password',
		'dburles:collection-helpers',
		'aldeed:collection2', 
		'aldeed:autoform', 
		'aldeed:tabular',
		'matb33:collection-hooks',
		'iron:router',
		'useraccounts:bootstrap',
		'less',
		'manuelschoebel:ms-seo'
		]);

	api.addFiles([
		'lib/init.js',

		'lib/config/init.js',
		'lib/config/permissions.js',
		'lib/config/functions.js',

		'lib/users/init.js',
		'lib/users/helpers.js',
		'lib/users/permissions.js',
		'lib/users/invitations.js',

		'lib/dictionary/init.js',
		'lib/dictionary/functions/get.js',
		'lib/dictionary/functions/get-schema.js',
		'lib/dictionary/functions/add-definition.js',
		'lib/dictionary/functions/default-category.js',
		'lib/dictionary/permissions.js',

		'lib/entities/init.js',
		'lib/entities/add.js',
		'lib/subscriptions/init.js',
		'lib/attributes/init.js',

		'admin/api/main.js',
		'admin/api/add-sidebar-tab.js',
		'admin/api/add-admin-subscription.js',
		'admin/accounts.js',
		'admin/routes.js',
		]);

	api.addFiles([
		'lib/dictionary/fixtures.js',
		'lib/dictionary/publications.js',
		'lib/entities/publications.js',
		'lib/config/fixtures.js',
		'lib/config/publications.js',
		'lib/users/functions.js',
		'lib/users/publications.js',
		], 'server');

	api.addFiles([
		'lib/dictionary/helpers.js',
		'.npm/package/node_modules/spin.js/spin.js',
		'admin/views/base/footer/footer.html',
		'admin/views/base/header/header.html',
		'admin/views/base/layouts/admin/layout.html',
		'admin/views/base/layouts/admin/layout.js',
		'admin/views/base/layouts/admin/layout.less',
		'admin/views/base/layouts/out-admin/layout.html',
		'admin/views/base/layouts/out-admin/layout.js',
		'admin/views/base/loading/loading.html',
		'admin/views/base/loading/loading.js',
		'admin/views/base/loading/loading.less',
		'admin/views/base/sidebar/sidebar.html',
		'admin/views/base/sidebar/sidebar.js',
		'admin/views/base/sidebar/sidebar.less',
		'admin/views/dictionary/update/update.html',
		'admin/views/dictionary/update/update.js',
		'admin/views/dictionary/update/update.less',
		'admin/views/config/password/password.html',
		'admin/views/config/password/password.js',
		'admin/views/config/password/password.less',
		'admin/views/config/update/update.html',
		'admin/views/config/update/update.js',
		'admin/views/config/update/update.less',
		'admin/views/entities/create/create.html',
		'admin/views/entities/create/create.js',
		'admin/views/entities/delete/delete.html',
		'admin/views/entities/delete/delete.js',
		'admin/views/entities/index/index.html',
		'admin/views/entities/index/index.js',
		'admin/views/entities/index/index.less',
		'admin/views/entities/update/update.html',
		'admin/views/entities/update/update.js',
		'admin/views/accounts/setup/setup.html',
		'admin/views/accounts/setup/setup.js',
		'admin/views/accounts/login/login.html',
		'admin/views/accounts/login/login.js',
		'admin/views/accounts/invitation/invitation.html',
		'admin/views/accounts/invitation/invitation.js',
		'admin/views/users/index/index.html',
		'admin/views/users/index/index.js',
		'admin/views/users/edit/edit.html',
		'admin/views/users/edit/edit.js',
		'admin/views/users/delete/delete.html',
		'admin/views/users/delete/delete.js',
		'admin/views/users/create/create.html',
		'admin/views/users/create/create.js',
		'admin/views/extras/not-allowed.html',
		], 'client');
	
	api.export('orion');
});

Package.onTest(function(api) {
	api.use('tinytest');
	api.use('orionjs:core');
});
