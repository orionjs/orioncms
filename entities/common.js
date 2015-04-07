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
	newEntity.customPermissions = [];

	// Creates the mongo collection in the collection variable
	newEntity.collection = new Meteor.Collection(name);

	// Adds the permissions for the entity
	orion.users.permissions.add('entity.' + name + '.all');
	orion.users.permissions.add('entity.' + name+ '.personal');

	// Set the permissions
	var allow = orion.getEntityDefaultAllowPermissions(newEntity);
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
		extraFields: newEntity.options.extraFields,
		selector: function(userId) {
			if (!userId) {
				return null;
			}

			var user = Meteor.users.findOne(userId);

			if (user.hasPermission('entity.' + newEntity.name + '.all')) {
				return {}
			}

			if (user.hasPermission('entity.' + newEntity.name + '.personal')) {
				return { createdBy: userId }
			}

			for (var i = 0; i < newEntity.customPermissions.length; i++) {
				var permission = newEntity.customPermissions[i];
				if (user.hasPermission('entity.' + newEntity.name + '.' + permission.name)) {
					return permission.indexFilter(userId);
				}
			}

			return null;
		}
	});

	// Saves the new entity to the array
	this.entities[name] = newEntity;

	return newEntity;
}

/**
 * Returns the allow permissions for a new entity
 */
orion.getEntityDefaultAllowPermissions = function(entity) {
	return {
		'insert': function(userId, doc) {
			var user = Meteor.users.findOne(userId);

			if (user.hasPermission('entity.' + entity.name + '.all')) {
				return doc.createdBy === userId;
			}

			if (user.hasPermission('entity.' + entity.name + '.personal')) {
				return doc.createdBy === userId;
			}

			for (var i = 0; i < entity.customPermissions.length; i++) {
				var permission = entity.customPermissions[i];
				if (user.hasPermission('entity.' + entity.name + '.' + permission.name)) {
					if (permission.fields) {
						var allowedFields = permission.fields(userId);
						var keys = _.keys(doc)
						var diff = _.difference(keys, allowedFields, ['createdAt', 'createdBy']);
						if (diff.length > 0) {
							return false;
						}
					}
					return permission.create(userId, doc) && doc.createdBy === userId;
				}
			}

			return false;
		},
		'update': function(userId, doc, fields, modifier) {
			if (_.contains(fields, 'createdBy')) {
				return false;
			}

			var user = Meteor.users.findOne(userId);
			if (user.hasPermission('entity.' + entity.name + '.all')) {
				return true;
			}
			if (user.hasPermission('entity.' + entity.name + '.personal')) {
				if (userId === doc.createdBy) {
					return true;
				}
			}
			for (var i = 0; i < entity.customPermissions.length; i++) {
				var permission = entity.customPermissions[i];
				if (user.hasPermission('entity.' + entity.name + '.' + permission.name)) {
					if (permission.fields) {
						var allowedFields = permission.fields(userId);
						var keys = fields;
						var diff = _.difference(keys, allowedFields, ['updatedAt']);
						if (diff.length > 0) {
							return false;
						}
					}
					return permission.update(userId, doc, fields, modifier);
				}
			}
			return false;
		},
		'remove': function(userId, doc) {
			var user = Meteor.users.findOne(userId);
			if (user.hasPermission('entity.' + entity.name + '.all')) {
				return true;
			}
			if (user.hasPermission('entity.' + entity.name + '.personal')) {
				if (userId === doc.createdBy) {
					return true;
				}
			}
			for (var i = 0; i < entity.customPermissions.length; i++) {
				var permission = entity.customPermissions[i];
				if (user.hasPermission('entity.' + entity.name + '.' + permission.name)) {
					return permission.remove(userId, doc);
				}
			}
			return false;
		}
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
		customTypeForm:false,
		indexTemplate: 'adminEntitiesIndexDefault',
		createTemplate: 'adminEntitiesCreateDefault',
		updateTemplate: 'adminEntitiesUpdateDefault',
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
			autoform: {
				omit: true
			},
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
			autoform: {
				omit: true
			},
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
			optional: true,
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
