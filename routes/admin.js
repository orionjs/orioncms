Router.map(function() {

	this.route('adminDictionaryUpdate', {
		layoutTemplate: 'adminLayout',
		path: '/admin/dictionary/:category?',
		onBeforeAction: AccountsTemplates.ensureSignedIn,
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
		path: '/admin/e/:entity/',
		onBeforeAction: AccountsTemplates.ensureSignedIn,
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
		path: '/admin/e/:entity/create',
		onBeforeAction: AccountsTemplates.ensureSignedIn,
		data: function() {
			return {
				entity: cms.entities[this.params.entity]
			}
		}
	})

	this.route('adminEntitiesUpdate', {
		layoutTemplate: 'adminLayout',
		path: '/admin/e/:entity/:_id/update',
		onBeforeAction: AccountsTemplates.ensureSignedIn,
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
		path: '/admin/e/:entity/:_id/delete',
		onBeforeAction: AccountsTemplates.ensureSignedIn,
		data: function() {
			var entity = _.findWhere(cms.entities, {name: this.params.entity});
			return {
				entity: entity,
				item: entity.collection.findOne(this.params._id)
			}
		}
	})

});