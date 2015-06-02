orion.attributes.registerAttribute('image', {
  template: 'orionAttributesImageUpload',
  previewTemplate: 'orionAttributesImageUploadColumn',
  getSchema: function(options) {
    var subSchema = new SimpleSchema({
      url: {
        type: String
      },
      width: {
        type: Number
      },
      height: {
        type: Number
      },
      fileId: {
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