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
  if (!_.has(orion.attributes, name)) {
    throw 'The attribute "' + name + '" does not exist';
  }
  schema = schema || {};
  options = options || {};
  var attributeSchema = orion.attributes[name].getSchema.call(this, options);
  var override = {
    orionAttribute: name,
    autoform: {
      type: 'orion.' + name
    }
  };
  var attribute = orion.helpers.deepExtend(orion.helpers.deepExtend(schema, attributeSchema), override);
  return attribute;
};

/**
 * Returns proper tabular column for the attribute
 */
orion.attributeColumn = function(name, key, title, options = {}) {
  check(options, {
    orderable: Match.Optional(Boolean)
  });
  var attributeDef = orion.attributes[name];

  if (attributeDef.orderable && options.orderable !== false) {
    options.orderable = true;
  }

  return {
    data: key,
    title: title,
    defaultContent: '',
    orderable: !!options.orderable,
    render: function() {
      return '';
    },
    createdCell: function(cell, cellData, rowData) {
      var collection = rowData._collection();
      var schema = rowData._collection().simpleSchema()._schema[key];
      var data = {
        key: key,
        value: cellData,
        item: rowData,
        collection: collection,
        schema: schema,
      };
      var template = ReactiveTemplates.get('attributePreview.' + name);
      Blaze.renderWithData(Template[template], data, cell);
    }
  };
};

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
  return orion.helpers.deepExtend(schema, {
    type: [subSchema]
  });
};

/**
 * Creates a new attribute
 */
orion.attributes.registerAttribute = function(name, attribute) {
  check(name, String);
  check(attribute, {
    template: Match.Optional(String),
    columnTemplate: Match.Optional(String),
    previewTemplate: Match.Optional(String),
    getSchema: Function,
    valueOut: Match.Optional(Function),
    valueIn: Match.Optional(Function),
    valueConverters: Match.Optional(Function),
    contextAdjust: Match.Optional(Function),
    orderable: Match.Optional(Boolean)
  });

  if (attribute.template) {
    ReactiveTemplates.request('attribute.' + name, attribute.template);
  }

  if (attribute.previewTemplate) {
    ReactiveTemplates.request('attributePreview.' + name, attribute.previewTemplate);
  }

  orion.attributes[name] = attribute;

  if (Meteor.isClient && attribute.template) {
    Tracker.autorun(function () {
      AutoForm.addInputType('orion.' + name, {
        template: ReactiveTemplates.get('attribute.' + name),
        valueIn: attribute.valueIn,
        valueOut: attribute.valueOut,
        valueConverters: attribute.valueConverters,
        contextAdjust: attribute.contextAdjust
      });
    });
  }
};
