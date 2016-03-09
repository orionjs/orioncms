orion.attributes.registerAttribute('materialnote', {
  template: 'orionAttributesMaterialnote',
  previewTemplate: 'orionAttributesMaterialnoteColumn',
  getSchema: function(options) {
    return {
      type: String
    };
  },
  valueOut: function() {
    return this.find('.materialnote').code();
  }
});

