/**
 * Helper function to extend
 */
var deepExtend = function(target, source) {
    for (var prop in source)
        if (prop in target && typeof(target[prop]) == 'object' && typeof(source[prop]) == 'object')
            deepExtend(target[prop], source[prop]);
        else
            target[prop] = source[prop];
    return target;
}

/**
 * Adds the option the set orionAttribute on SimpleSchema
 */
SimpleSchema.extendOptions({
	orionAttribute: Match.Optional(String),
	orion: Match.Optional(Object)
});

/**
 * Definition of the attributes object
 */
orion.attributes = {};

/**
 * Returns the schema for the attribute
 */
orion.attribute = function(name, schema, options) {

	var schema = schema || {};
	var options = options || {};
	var attributeSchema = orion.attributes[name].getSchema.call(this, options);
	var override = {
		orionAttribute: name,
		autoform: {
			type: 'orion_' + name
		}
	}
	var attribute = deepExtend(deepExtend(schema, attributeSchema), override);
	return attribute;
}

/**
 * Returns proper tabular column for the attribute
 */
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

/**
 * Helper function to use arrays of attributes (Ex: array of images)
 */
orion.arrayOfAttribute = function(name, schema, options) {
	var subSchema = new SimpleSchema({
		item: orion.attribute(name, {
			autoform: {
				label: false
			}
		})
	});
	return deepExtend(schema, {
		type: [subSchema]
	});
}

/**
 * Creates a new attribute
 */
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