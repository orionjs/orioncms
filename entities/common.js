/**
 * Definition of the entities object
 */
orion.entities = {}

/**
 * Creation process for entities
 */
orion.addEntity = function(name, schema, options) {
	var newEntity = {};
	newEntity.name = name;

	// Creates the mongo collection in the collection variable
	newEntity.collection = new Meteor.Collection(name);

	// Adds the permissions for the entity
	orion.users.permissions.add('entity.' + name + '.all');
	orion.users.permissions.add('entity.' + name+ '.personal');

	// Set the permissions
	var allow = orion.getEntityDefaultAllowPermissions(name);
	newEntity.collection.allow(allow);

	// Attachs the schema
	newEntity.schema = orion.getNewEntitySchema(schema);
	newEntity.collection.attachSchema(new SimpleSchema(newEntity.schema));

	// Get the options, override default
	newEntity.options = orion.getNewEntityOptions(name, options);

	// Sets the tabular table
	newEntity.table = new Tabular.Table({
		name: 'entities.' + name,
		collection: newEntity.collection,
		columns: newEntity.options.tableColumns,
		pub: 'entityTabular',
		sub: orion.subs,
		extraFields: newEntity.options.extraFields
	});

	// Saves the new entity to the array
	this.entities[name] = newEntity;

	return newEntity;
}

/**
 * Returns the allow permissions for a new entity
 */
orion.getEntityDefaultAllowPermissions = function(name) {
	return {
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
	};
}

/**
 * Get the default entity options
 */
orion.getNewEntityOptions = function(name, options) {
	return _.extend({
		sidebarName: name,
		icon: 'pencil',
		pluralName: name,
		singularName: name,
		tableColumns: [{data: '_id', title: 'ID'}],
		extraFields: [],
	}, options);
}

/**
 * Get the default entity schema
 */
orion.getNewEntitySchema = function(schema) {
	return _.extend({
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
					return this.userId;
				} else if (this.isUpsert) {
					return {$setOnInsert: this.userId};
				} else {
					this.unset();
				}
			}
		},
	}, schema);
}