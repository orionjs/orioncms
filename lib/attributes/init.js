var deepExtend = function(target, source) {
    for (var prop in source)
        if (prop in target && typeof(target[prop]) == 'object' && typeof(source[prop]) == 'object')
            deepExtend(target[prop], source[prop]);
        else
            target[prop] = source[prop];
    return target;
}

SimpleSchema.extendOptions({
	orionAttribute: Match.Optional(String)
});

orion.attributes = {};

orion.attribute = function(name, schema, options) {
	var schema = schema || {};
	var options = options || {};
	var attributeSchema = orion.attributes[name].getSchema(options);
	var override = {
		orionAttribute: name,
		autoform: {
			type: 'orion_' + name
		}
	}
	return deepExtend(deepExtend(schema, attributeSchema), override);
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