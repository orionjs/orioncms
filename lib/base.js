cms = {
	dictionary: {
		collection: new Meteor.Collection('dictionary'),
		schema: {},
		categories: {},
		getDefaultCategory: function() {
			return _.first(_.keys(this.categories));
		},
		addDefinition: function(name, category, schema) {
			if (!this.categories[category]) {
				this.categories[category] = [];
			}

			this.categories[category].push(name);
			this.schema[name] = schema;

			this.collection.attachSchema(new SimpleSchema(this.schema));

		}
	},
	entities: {

	},
	addEntity: function(name, collection, schema, options) {
		var newCollection = {};
		newCollection.name = name;
		newCollection.collection = new Meteor.Collection(collection);

		var defaultSchema = {
			createdAt: {
				type: Date,
				autoValue: function() {
					if (this.isInsert) {
						return new Date;
					} else if (this.isUpsert) {
						return {$setOnInsert: new Date};
					} else {
						this.unset();
					}
				}
			},
			updatedAt: {
				type: Date,
				autoValue: function() {
					if (this.isUpdate) {
						return new Date();
					}
				},
				denyInsert: true,
				optional: true
			},
		};
		newCollection.schema = _.extend(defaultSchema, schema);
		newCollection.collection.attachSchema(new SimpleSchema(newCollection.schema));

		var defaultOptions = {
			sidebarName: name,
			pluralName: name,
			singularName: name,
			defaultIndexTableFields: [{key: '_id', label: 'ID'}],
		}

		newCollection.options = _.extend(defaultOptions, options);

		this.entities[name] = newCollection;
	}

};



Meteor.startup(function(){
	AccountsTemplates.configure({
	    forbidClientAccountCreation: true,
	    enablePasswordChange: true,
	});
	AccountsTemplates.configureRoute('changePwd', {
		template: 'accountsFormTemplate',
		layoutTemplate: 'adminLayout',
	});
	AccountsTemplates.init();
});