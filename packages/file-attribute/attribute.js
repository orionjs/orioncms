orion.attributes.registerAttribute('file', {
  template: 'orionAttributesFileUpload',
  columnTemplate: 'orionAttributesFileUploadColumn',
  getSchema: function(options) {
    var subSchema = new SimpleSchema({
      url: {
        type: String
      },
      /** TODO
      fileId: {
        type: String
      }
      */
    });
    return {
      type: subSchema
    };
  },
  valueOut: function() {
    return Session.get('file' + this.attr('data-schema-key'));
  },
});