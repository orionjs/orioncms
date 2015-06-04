orion.attributes.registerAttribute('image', {
  template: 'orionAttributesImageUpload',
  previewTemplate: 'orionAttributesImageUploadColumn',
  getSchema: function(options) {
    var colorSchema = new SimpleSchema({
      r: {
        type: Number
      },
      g: {
        type: Number
      },
      b: {
        type: Number
      }
    });
    var subSchema = new SimpleSchema({
      url: {
        type: String
      },
      fileId: {
        type: String
      },
      info: {
        type: Object
      },
      'info.width': {
        type: Number
      },
      'info.height': {
        type: Number
      },
      'info.primaryColor': {
        type: colorSchema
      },
      'info.pallete': {
        type: [colorSchema]
      }
    });
    return {
      type: subSchema
    };
  },
  valueOut: function() {
    return Session.get('image' + this.attr('data-schema-key'));
  },
});