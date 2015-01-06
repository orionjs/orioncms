orion.addEntity = function(name, schema, options) {
	var newCollection = {};
	newCollection.name = name;
	newCollection.collection = new Meteor.Collection(name);

	newCollection.collection.allow({
		'insert': function(userId, doc) {
			return userId;
		},
		'update': function(userId, doc, fields, modifier) {
			return userId;
		},
		'remove': function(userId, doc) {
			return userId;
		}
	});

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
		icon: 'pencil',
		pluralName: name,
		singularName: name,
		tableColumns: [{key: '_id', label: 'ID'}],
	}

	newCollection.options = _.extend(defaultOptions, options);

	defaultOptions.tableColumns.push({
		tmpl: Meteor.isClient && Template.adminEntitiesIndexTableActions
	});

	newCollection.table = new Tabular.Table({
		name: newCollection.options.pluralName,
		collection: newCollection.collection,
		columns: newCollection.options.tableColumns
	});

	this.entities[name] = newCollection;
}