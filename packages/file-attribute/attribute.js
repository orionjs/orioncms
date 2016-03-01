orion.attributes.registerAttribute('file', {
  template: 'orionAttributesFileUpload',
  previewTemplate: 'orionAttributesFileUploadColumn',
  getSchema: function(options) {
    var subSchema = new SimpleSchema({
      url: {
        type: String
      },
      fileId: {
        type: String,
        optional: true,
      },
      meta: {
        type: Object,
        blackbox: true,
        optional: true,
      }
    });
    return {
      type: subSchema
    };
  },
  valueOut: function() {
    return Session.get('file' + this.attr('data-schema-key'));
  },
});