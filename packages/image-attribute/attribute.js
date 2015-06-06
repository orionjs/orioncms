orion.attributes.registerAttribute('image', {
  template: 'orionAttributesImageUpload',
  previewTemplate: 'orionAttributesImageUploadColumn',
  getSchema: function(options) {
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
      'info.backgroundColor': {
        type: String
      },
      'info.primaryColor': {
        type: String
      },
      'info.secondaryColor': {
        type: String
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