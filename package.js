Package.describe({
	name: 'nicolaslopezj:cms',
	summary: 'Simple CMS for meteor',
	version: '0.2.4',
	git: 'https://github.com/nicolaslopezj/meteor-cms'
});

Npm.depends({
	"spin.js": "2.0.1"
});


Package.onUse(function(api) {
	api.versionsFrom('1.0');

	api.use([
		'meteor-platform',
		'meteorhacks:subs-manager@1.1.0',
		'less', 
		'accounts-password', 
		'iron:router@1.0.1', 
		'zimme:iron-router-active@1.0.0', 
		'dburles:collection-helpers@0.1.0', 
		'fuatsengul:iron-router-auth@1.0.7', 
		'cunneen:mailgun@0.9.1', 
		'aldeed:collection2@2.0.0', 
		'aldeed:autoform@4.0.0-rc10', 
		'aslagle:reactive-table@0.5.5', 
		'hckrs:summernote@0.0.1', 
		'aldeed:delete-button@1.0.0', 
		'lepozepo:s3@4.1.1', 
		'useraccounts:bootstrap@1.2.1',
		]);


	api.imply([
		'accounts-password',
		'less', 
		'zimme:iron-router-active',
		'iron:router',
		'dburles:collection-helpers',
		'meteorhacks:subs-manager',
		]);


	api.addFiles([
		'lib/cms/base.js',
		'lib/cms/dictionary.js',
		'lib/cms/entities.js',
		'lib/cms/subscriptions.js',
		'lib/cms/accounts.js',

		'lib/attributes/base.js',
		'lib/attributes/image.js',

		'lib/accounts.js',

		'routes/admin.js',
		]);

	api.addFiles([
		'server/fixtures.js',
		'server/publications.js',
		], 'server');

	api.addFiles([
		'.npm/package/node_modules/spin.js/spin.js',
		
		'client/admin/layout/footer.html',
		'client/admin/layout/header.html',
		'client/admin/layout/layout.html',
		'client/admin/layout/layout.js',
		'client/admin/layout/sidebar.html',
		'client/admin/layout/sidebar.js',
		'client/admin/layout/accounts/formTemplate.html',
		'client/admin/layout/accounts/formTemplate.js',
		'client/admin/layout/accounts/formTemplate.less',
		'client/admin/layout/loading/loading.html',
		'client/admin/layout/loading/loading.js',
		'client/admin/layout/loading/loading.less',

		'client/admin/dictionary/index/index.html',
		'client/admin/dictionary/update/update.html',
		'client/admin/dictionary/update/update.js',

		'client/admin/entities/create/create.html',
		'client/admin/entities/create/create.js',
		'client/admin/entities/delete/delete.html',
		'client/admin/entities/delete/delete.js',
		'client/admin/entities/index/index.html',
		'client/admin/entities/index/index.js',
		'client/admin/entities/update/update.html',
		'client/admin/entities/update/update.js',

		'client/autoform/image/image.html',
		'client/autoform/image/image.js',
		'client/autoform/image/image.less',

		'client/helpers/cms.js',
		'client/helpers/dictionary.js',
		'client/helpers/entities.js',

		'client/stylesheets/cms-global.less',
		], 'client');

	api.export('cms');

});

