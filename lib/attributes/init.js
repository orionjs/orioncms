SimpleSchema.extendOptions({
	orionAttribute: Match.Optional(String)
});

orion.attributes = {};

orion.attribute = function(name, options) {
	var schema = orion.attributes[name].getSchema(options);
	schema.orionAttribute = name;
	if (!schema.autoform) {
		schema.autoform = {};
	}
	schema.autoform.type = 'orion_' + name;
	return schema;
}

orion.attributeColumn = function(name, key, title) {
	return {
		data: key,
		title: title,
		defaultContent: '',
		orderable: false,
		render: function() {
			return '';
		},
		createdCell: function(cell, cellData, rowData) {
        	Blaze.renderWithData(Template[orion.attributes[name].columnTemplate], cellData, cell);
        }
	}
}

orion.arrayOfAttribute = function(name, options) {
	var subSchema = new SimpleSchema({
		item: orion.attribute(name, {})
	});
	return {
		type: [subSchema],
		label: options.label,
		optional: options.optional,
	};
}

orion.attributes.registerAttribute = function(name, attribute) {
	orion.attributes[name] = attribute;

	if (Meteor.isClient) {
		AutoForm.addInputType('orion_' + name, {
			template: attribute.template,
			valueIn: attribute.valueIn,
			valueOut: attribute.valueOut,
			valueConverters: attribute.valueConverters,
			contextAdjust: attribute.contextAdjust
		});
	}
}