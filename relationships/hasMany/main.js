/**
 * Has one attribute
 */
orion.attributes.registerAttribute('hasMany', {
	template: 'orionAttributesHasMany',
	columnTemplate: 'orionAttributesHasManyColumn',
	getSchema: function(options) {
		check(options, {
			titleField: String,
			publicationName: String,
			pluralName: Match.Optional(String),
			singularName: Match.Optional(String),
			entity: Match.Optional(Match.Any),
			collection: Match.Optional(Match.Any),
			filter: Match.Optional(Match.Any),
			createFilter: Match.Optional(Match.Any),
			create: Match.Optional(Match.Any),
			aditionalFields: Match.Optional(Array),
			render: Match.Optional({
				item: Match.Any,
				option: Match.Any
			})
		});

		if (options.entity) {
			var entity = orion.entities[options.entity];
			options.collection = entity.collection;
			options.pluralName = entity.options.pluralName.toLowerCase();
			options.singularName = entity.options.singularName.toLowerCase();
		}

		if (!options.filter) {
			options.filter = function(userId) {
				return {};
			};
		}

		if (!options.create) {
			options.create = false;
		}

		if (!options.render) {
			options.render = {
				item: function(item, escape) {
		            return '<div>' + escape(item[options.titleField]) + '</div>';
		        },
		        option: function(item, escape) {
		            return '<div>' + escape(item[options.titleField]) + '</div>';
		        }
			}
		}

		if (!options.aditionalFields) {
			options.aditionalFields = [];
		}

		if (!options.pluralName) {
			options.pluralName = 'items';
		}

		if (!options.singularName) {
			options.singularName = 'item';
		}

		options.fields = options.aditionalFields;
		options.fields.push(options.titleField);

		if (Meteor.isServer) {
			Meteor.publish(options.publicationName, function () {
				var pubFields = {};
				for (var i = 0; i < options.fields.length; i++) {
					pubFields[options.fields[i]] = 1;
				};
				return options.collection.find(options.filter(this.userId), { fields: pubFields });
			});
		}

		return {
			type: [String],
			orion: options
		};
	},
	valueOut: function() {
		return this.val();
	}
});



