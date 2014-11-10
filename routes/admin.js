Router.map(function() {

	this.route('admin', {
		layoutTemplate: 'adminLayout',
		loadingTemplate: 'adminLoading',
		onBeforeAction: AccountsTemplates.ensureSignedIn,
		waitOn: function () {
			return cms.subs.subscribe('dictionary');
		},
		action: function() {
			this.redirect('adminDictionaryUpdate');
		}
	});

	this.route('adminDictionaryUpdate', {
		layoutTemplate: 'adminLayout',
		loadingTemplate: 'adminLoading',
		path: '/admin/dictionary/:category?',
		waitOn: function () {
			return cms.subs.subscribe('dictionary');
		},
		data: function() {
			if (this.params.category) {
				return {
					category: this.params.category,
					fields: cms.dictionary.categories[this.params.category]
				}
			} else {
				return {
					category: cms.dictionary.getDefaultCategory(),
					fields: cms.dictionary.categories[cms.dictionary.getDefaultCategory()]
				}
			}
		}
	});


	this.route('adminEntitiesIndex', {
		layoutTemplate: 'adminLayout',
		loadingTemplate: 'adminLoading',
		path: '/admin/e/:entity/',
		waitOn: function () {
			return [cms.subs.subscribe('dictionary'), cms.subs.subscribe('entity', this.params.entity)];
		},
		data: function() {
			var entity = _.findWhere(cms.entities, {name: this.params.entity});
			return {
				entity: entity,
				items: entity.collection.find()
			}
		}
	})

	this.route('adminEntitiesCreate', {
		layoutTemplate: 'adminLayout',
		loadingTemplate: 'adminLoading',
		path: '/admin/e/:entity/create',
		data: function() {
			return {
				entity: cms.entities[this.params.entity]
			}
		}
	})

	this.route('adminEntitiesUpdate', {
		layoutTemplate: 'adminLayout',
		loadingTemplate: 'adminLoading',
		path: '/admin/e/:entity/:_id/update',
		waitOn: function () {
			return [cms.subs.subscribe('dictionary'), cms.subs.subscribe('entity', this.params.entity)];
		},
		data: function() {
			var entity = _.findWhere(cms.entities, {name: this.params.entity});
			return {
				entity: entity,
				item: entity.collection.findOne(this.params._id)
			}
		}
	})

	this.route('adminEntitiesDelete', {
		layoutTemplate: 'adminLayout',
		loadingTemplate: 'adminLoading',
		path: '/admin/e/:entity/:_id/delete',
		waitOn: function () {
			return [cms.subs.subscribe('dictionary'), cms.subs.subscribe('entity', this.params.entity)];
		},
		data: function() {
			var entity = _.findWhere(cms.entities, {name: this.params.entity});
			return {
				entity: entity,
				item: entity.collection.findOne(this.params._id)
			}
		}
	})

});

Router.onBeforeAction(function() {

	if (!Meteor.user()) {
        AccountsTemplates.setPrevPath(Router.current().url);
        AccountsTemplates.setState(AccountsTemplates.options.defaultState, function(){
            var err = T9n.get(AccountsTemplates.texts.errors.mustBeLoggedIn, markIfMissing=false);
            AccountsTemplates.state.form.set("error", [err]);
        });
        AccountsTemplates.avoidRedirect = true;
        // render the login template but keep the url in the browser the same
        var signInRouteTemplate = AccountsTemplates.routes.signIn && AccountsTemplates.routes.signIn.template;
        this.render(signInRouteTemplate || "fullPageAtForm");
        this.renderRegions();
    } else {
        this.next();
    }

}, {
    only: ['admin', 'adminDictionaryUpdate', 'adminEntitiesIndex', 'adminEntitiesCreate', 'adminEntitiesUpdate', 'adminEntitiesDelete']
});