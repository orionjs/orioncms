orion.addEntity = function(name, schema, options) {
	var newCollection = {};
	newCollection.name = name;
	newCollection.collection = new Meteor.Collection(name);

	orion.users.permissions.add('entity.' + name + '.all');
	orion.users.permissions.add('entity.' + name+ '.personal');

	newCollection.collection.allow({
		'insert': function(userId, doc) {
			var user = Meteor.users.findOne(userId);
			return (user.hasPermission('entity.' + name) && doc.createdBy === userId);
		},
		'update': function(userId, doc, fields, modifier) {
			if (_.contains(fields, 'createdBy')) {
				return false;
			}

			var user = Meteor.users.findOne(userId);
			if (user.hasPermission('entity.' + name + '.all')) {
				return true;
			}
			if (user.hasPermission('entity.' + name + '.personal')) {
				if (userId === doc.createdBy) {
					return true;
				}
			}
			return false;
		},
		'remove': function(userId, doc) {
			var user = Meteor.users.findOne(userId);
			if (user.hasPermission('entity.' + name + '.all')) {
				return true;
			}
			if (user.hasPermission('entity.' + name + '.personal')) {
				if (userId === doc.createdBy) {
					return true;
				}
			}
			return false;
		},
		fetch: ['createdBy']
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
		createdBy: {
			type: String,
			autoform: {
				omit: true
			},
			autoValue: function() {
				if (this.isInsert) {
					return Meteor.userId();
				} else if (this.isUpsert) {
					return {$setOnInsert: Meteor.userId()};
				} else {
					this.unset();
				}
			}
		},
	};
	newCollection.schema = _.extend(defaultSchema, schema);
	newCollection.collection.attachSchema(new SimpleSchema(newCollection.schema));

	var defaultOptions = {
		sidebarName: name,
		icon: 'pencil',
		pluralName: name,
		singularName: name,
		tableColumns: [{data: '_id', title: 'ID'}],
	}

	newCollection.options = _.extend(defaultOptions, options);

	defaultOptions.tableColumns.push({
		tmpl: Meteor.isClient && Template.adminEntitiesIndexTableActions
	});

	newCollection.table = new Tabular.Table({
		name: 'entities.' + name,
		collection: newCollection.collection,
		columns: newCollection.options.tableColumns,
		pub: 'entityTabular'
	});

	this.entities[name] = newCollection;
}