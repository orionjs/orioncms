orion.pages = {
	templates: {},
	collection: new Meteor.Collection('pages')
};

orion.pages.collection.allow({
	'insert': function(userId, doc) {
		var user = Meteor.users.findOne(userId);
		return (user.hasPermission('pages') && doc.createdBy === userId);
	},
	'update': function(userId, doc, fields, modifier) {
		if (_.contains(fields, 'createdBy')) {
			return false;
		}

		var user = Meteor.users.findOne(userId);
		return user.hasPermission('pages');
	},
	'remove': function(userId, doc) {
		var user = Meteor.users.findOne(userId);
		return user.hasPermission('pages');
	},
	fetch: ['createdBy']
});

orion.pages.collection.helpers({
	path: function () {
		return Router.path('pages', {url: this.url});
	}
});

if (Meteor.isServer) {
	Meteor.publish('pages', function(arg1, arg2) {
		arg1 = arg1 ? arg1 : {};
		return orion.pages.collection.find(arg1, arg2);
	});
}

/**
 * Create a new template
 */
orion.pages.addTemplate = function(options, schema) {
	if (!options.template) {
		throw "Template is required";
	}

	var newTemplate = _.extend({
		name: options.template,
		description: 'No description',
	}, options);

	var newSchema = orion.pages.getNewTemplateSchema(schema, newTemplate);
	newTemplate.schema = new SimpleSchema(newSchema);

	orion.pages.templates[newTemplate.template] = newTemplate;

	return newTemplate;
}

orion.pages.getNewTemplateSchema = function(schema, newTemplate) {
	return _.extend({
		title: {
			type: String,
			label: "Title",
		},
		url: {
			type: String,
			regEx: /^[a-z0-9A-Z_-]+$/,
			unique: true,
			label: "Url"
		},
		template: {
			type: String,
			autoform: {
				omit: true
			},
			autoValue: function() {
				return newTemplate.template;
			}
		},
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